export class Game {
  gameState: number[];
  currentMove: number = 0;
  
  constructor(gameState: number[]){
    this.gameState = gameState;
    console.log(this.gameState);
  }

  playMove(){
    let currentCup = this.gameState[0];





    
    // When the move is done, update the gameState.
    currentCup = this.gameState.shift()!
    this.gameState.push(currentCup);
  }
}