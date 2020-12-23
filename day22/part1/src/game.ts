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


  playUntilWinner(): number {
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
    return this.winner.calculateScore();
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
    let prizeCard: number;

    if (this.player1.cards[0] > this.player2.cards[0]){ // player 1 wins
      prizeCard = this.player2.handleLostTurn();
      this.player1.handleWonTurn(prizeCard);
    }
    else if (this.player2.cards[0] > this.player1.cards[0]){
      prizeCard = this.player1.handleLostTurn();
      this.player2.handleWonTurn(prizeCard);
    }
  }
}