export class Game {
  gameState: number[];
  currentMove: number = 0;
  
  constructor(gameState: number[]){
    this.gameState = gameState;
    console.log(this.gameState);
  }

  playMove(): void{
    let currentCup = this.gameState[0];
    const pickedUpCups: number[] = this.gameState.slice(1,4);
    this.gameState = [currentCup, ...this.gameState.slice(4)];

    const target: number = this.findTarget(currentCup, pickedUpCups);
    this.insertIntoGamestate(target, pickedUpCups);
    
    // When the move is done, update the gameState.
    currentCup = this.gameState.shift()!
    this.gameState.push(currentCup);
  }


  findTarget(currentCup: number, pickedUpCups: number[]): number{
    let target: number = currentCup -1;

    let stillSearching: boolean = true;
    while(stillSearching){
      if(target === 0 ){
        target = 9;
      }
      if(pickedUpCups.includes(target)){
        target = target -1;
      } else{
        stillSearching = false;
      }
    }

    return target;
  }


  insertIntoGamestate(targetCup: number, pickedUpCups: number[]): void{
    let newGameState: number[] = [];
    for(let i = 0; i < this.gameState.length; i++){
      if(this.gameState[i] === targetCup){
        newGameState = [...this.gameState.slice(0, i+1), ...pickedUpCups, ...this.gameState.slice(i+1)];
        break;
      }
    }
    this.gameState = newGameState;
  }


  printState(): void{
    console.log(this.gameState);
  }


  cupsAfter1(): void{
    let cupsAfter1: number[] = [];
    for(let i = 0; i < this.gameState.length; i++){
      if(this.gameState[i] === 1){
        cupsAfter1 = [...this.gameState.slice(i+1), ...this.gameState.slice(0, i)];
      }
    }

    console.log("Starting from the 1 cup, cups are: ", cupsAfter1);
  }
}