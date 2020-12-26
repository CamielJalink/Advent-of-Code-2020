export class Cup {
  name: number;
  prevCup: Cup = this;
  nextCup: Cup = this;

  constructor(name: number){
    this.name = name;
  }
}