import { Player } from "./player";

export class Game{
  inProgress: boolean = true;
  cardsInPlay: number = 0;
  winner: Player;
  player1: Player;
  player2: Player;
  p1HandHistory: number[][] = [];
  p2HandHistory: number[][] = [];

  constructor(player1Input: number[], player2Input: number[]){
    this.player1 = new Player("Player 1", player1Input);
    this.player2 = new Player("Player 2", player2Input);
    this.cardsInPlay = this.player1.cards.length + this.player2.cards.length;
    this.winner = this.player1; // A default winner for initialization.
  }


  playUntilWinner(): string {
    while(this.inProgress){
      if (this.infiniteGameDetected()) {
        this.winner = this.player1;
        this.inProgress = false;
        console.log("Infinite Loop detected, so player 1 wins");
      }

      else{
        this.p1HandHistory.push([...this.player1.cards]);
        this.p2HandHistory.push([...this.player2.cards]);
        this.playTurn();

        if (this.player1.cards.length === this.cardsInPlay) {
          this.winner = this.player1;
          this.inProgress = false;
        } else if (this.player2.cards.length === this.cardsInPlay) {
          this.winner = this.player2;
          this.inProgress = false;
        }
      }
    }
    return this.winner.name;
  }


  infiniteGameDetected(): boolean{
    let infiniteLoopDetected: boolean = false;
    let p1HandSeenBefore: boolean = false;
    
    for(let i = 0; i < this.p1HandHistory.length; i++){
      if (this.checkIdenticalHand(this.p1HandHistory[i], this.player1.cards)) {
        p1HandSeenBefore = true;
        break;
      }
    }

    if(p1HandSeenBefore){
      for (let i = 0; i < this.p2HandHistory.length; i++) {
        if (this.checkIdenticalHand(this.p2HandHistory[i], this.player2.cards)) {
          infiniteLoopDetected = true;
          break;
        }
      }
    }
    return infiniteLoopDetected;
  }


  checkIdenticalHand(historyHand: number[], currentHand: number[]): boolean {
    let handsIdentical: boolean = true;
    if(historyHand.length !== currentHand.length){
      handsIdentical = false;
    }
    else{
      for(let i = 0; i < historyHand.length; i++){
        if(historyHand[i] !== currentHand[i]){
          handsIdentical = false;
          break;
        }
      }
    }
    return handsIdentical;
  }


  // Assumes two players for now.
  playTurn(): void{
    const player1Card: number = this.player1.playCard();
    const player2Card: number = this.player2.playCard();
    let player1Wins: boolean = false;

    // Check the recursive game requirement.
    if(this.player1.cards.length >= player1Card && this.player2.cards.length >= player2Card) {
      player1Wins = this.playRecursiveGame(player1Card, player2Card);
    }
    else{
      // The non-recursive way of settling a round
      if (player1Card > player2Card) {
        player1Wins = true;
      }
      else if (player2Card > player1Card) {
        player1Wins = false;
      }
    }

    if(player1Wins){
      this.player1.wonCards(player1Card, player2Card);
    } else{
      this.player2.wonCards(player2Card, player1Card);
    }
  }


  playRecursiveGame(player1Card: number, player2Card: number): boolean{
    const player1Hand: number[] = [];
    const player2Hand: number[] = [];

    for(let i = 0; i < player1Card; i++){
      player1Hand.push(this.player1.cards[i]);
    }
    for (let i = 0; i < player2Card; i++) {
      player2Hand.push(this.player2.cards[i]);
    }

    const subGame: Game = new Game(player1Hand, player2Hand);
    if (subGame.playUntilWinner() === "Player 1"){
      return true;
    } else{
      return false;
    }
  }
}