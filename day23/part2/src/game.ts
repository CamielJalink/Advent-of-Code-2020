import { Cup } from "./cup";

export class Game {
  gameState: Map<number, Cup> = new Map();
  pickedUpCups: Cup[] = [];
  currentCup: Cup;
  
  constructor(gameState: number[]){
    const tempGameState: Cup[] = [];
    this.currentCup = new Cup(gameState[0]);
    tempGameState.push(this.currentCup);

    for(let i = 1; i < gameState.length; i++){
      const cup = new Cup(gameState[i]);
      cup.prevCup = tempGameState[i - 1];
      cup.prevCup.nextCup = cup;
      tempGameState.push(cup);
    }

    tempGameState[0].prevCup = tempGameState[tempGameState.length-1];
    tempGameState[tempGameState.length - 1].nextCup = tempGameState[0];

    tempGameState.forEach((cup: Cup) => {
      this.gameState.set(cup.name, cup);
    })
  }


  playMove(): void{
    // Pick up three cups and close the circle behind them
    this.pickUpCups();
    // Find the target cup
    const target: Cup = this.findTarget();
    // Insert picked up cups behind the target and fix their references
    this.insertIntoGamestate(target);
    // When the move is done, update the gameState.
    this.currentCup = this.currentCup.nextCup;
  }


  pickUpCups(): void{
    const cup1: Cup = this.currentCup.nextCup;
    const cup2: Cup = cup1.nextCup;
    const cup3: Cup = cup2.nextCup;
    const cup4: Cup = cup3.nextCup;

    this.pickedUpCups = [cup1, cup2, cup3];
    this.currentCup.nextCup = cup4; 
    cup4.prevCup = this.currentCup;
  }


  findTarget(): Cup{
    let targetName: number = this.currentCup.name - 1;
    let stillSearching: boolean = true;

    while (stillSearching) {
      if (targetName === 0) {
        targetName = 1000000;
      }
      
      let targetInPickedUp: boolean = false;
      for(let i = 0; i < this.pickedUpCups.length; i++){
        if(this.pickedUpCups[i].name === targetName){
          targetInPickedUp = true;
        }
      }

      if (targetInPickedUp) {
        targetName = targetName - 1;
      } else {
        stillSearching = false;
      }
    }

    let targetCup: Cup = new Cup(-1);
    const target = this.gameState.get(targetName);
    if(target !== undefined){
      targetCup = target;
    }
    return targetCup;
  }


  insertIntoGamestate(targetCup: Cup): void{
    const cup1: Cup = this.pickedUpCups[0];
    const cup3: Cup = this.pickedUpCups[2];

    cup3.nextCup = targetCup.nextCup;
    targetCup.nextCup = cup1;
    cup1.prevCup = targetCup;
    targetCup.nextCup.prevCup = cup3;
  }


  findTwoCupsAfter1(): void{
    const cup1 = this.gameState.get(1);
    if(cup1 !== undefined){
      const cup2: Cup = cup1.nextCup;
      const cup3: Cup = cup2.nextCup;
      console.log(cup2.name * cup3.name);
    }
  }
}