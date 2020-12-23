export class Game{
  inProgress: boolean = true;
  cardsInPlay: number = 0;
  players: Player[] = [];
  winner: Player | undefined = undefined;

  constructor(stringHands: string[]){
    stringHands.forEach((stringHand: string) => {
      const stringPlayer: string[] = stringHand.split('\r\n');
      this.players.push(new Player(stringPlayer));
    })
    this.players.forEach((player: Player) => {
      this.cardsInPlay += player.cards.length;
    })
  }


  playUntilWinner(): number {
    this.winner = this.players[0];

    while(this.inProgress){
      this.playTurn();

      this.players.forEach((player: Player) => {
        if(player.cards.length === this.cardsInPlay){
          this.winner = player;
          this.inProgress = false;
        }
      })
    }
  
    console.log(this.winner.cards);

    return this.winner.calculateScore();
  }


  // Assumes two players for now.
  playTurn(): void{
    const player1 = this.players[0];
    const player2 = this.players[1];
    let prizeCard: number;

    if(player1.cards[0] > player2.cards[0]){ // player 1 wins
      prizeCard = player2.handleLostTurn();
      player1.handleWonTurn(prizeCard);
    }
    else if (player2.cards[0] > player1.cards[0]){
      prizeCard = player1.handleLostTurn();
      player2.handleWonTurn(prizeCard);
    }
  }
}






export class Player {
  name: string;
  cards: number[];

  constructor(stringHand: string[]) {
    this.name = stringHand[0];
    stringHand.shift();
    this.cards = stringHand.map((stringCard: string) => Number(stringCard));
  }


  calculateScore(): number{
    let score: number = 0; 
    const reverseCards: number[] = this.cards.reverse();
    for(let i = 1; i <= reverseCards.length; i++){
      score += reverseCards[i-1] * i;
    }
    return score;
  }


  // Player won a turn, keeps his card and receives a card
  handleWonTurn(prizeCard: number): void {
    const winningCard: number = this.cards[0];
    this.cards.shift();
    this.cards.push(winningCard);
    this.cards.push(prizeCard);
  }


  // Player lost a turn so loses a card
  handleLostTurn(): number {
    const cardPrize = this.cards[0];
    this.cards.shift();
    return cardPrize;
  }
}