export class Player {
  name: string;
  cards: number[];

  constructor(name: string, startingCards: number[]) {
    this.name = name;
    this.cards = startingCards;
  }


  calculateScore(): number {
    let score: number = 0;
    const reverseCards: number[] = this.cards.reverse();
    for (let i = 1; i <= reverseCards.length; i++) {
      score += reverseCards[i - 1] * i;
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