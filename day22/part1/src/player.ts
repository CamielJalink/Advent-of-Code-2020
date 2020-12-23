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


  playCard(): number{
    const card: number = this.cards[0];
    this.cards.shift();
    return card;
  }


  wonCards(ownCard: number, prizeCard: number): void{
    this.cards.push(ownCard);
    this.cards.push(prizeCard);
  }
}