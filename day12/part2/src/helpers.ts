export interface Command{
  direction: string,
  argument: number
}


export function parseCommands(stringCommands: string[]){
  const commands: Command[] = [];
  stringCommands.forEach((stringCommand: string) => {
    let command: Command = {
      direction: stringCommand[0],
      argument: Number(stringCommand.substring(1))
    }
    commands.push(command);
  })
  return commands;
}


export class Ferry{
  x: number = 0;
  y: number = 0;
  wpX: number = 10;
  wpY: number = 1;

  constructor(){}

  goNorth(amount: number){
    this.wpY += amount;
  }
  goSouth(amount: number) {
    this.wpY -= amount;
  }
  goEast(amount: number) {
    this.wpX += amount;
  }
  goWest(amount: number) {
    this.wpX -= amount;
  }

  goLeft(amount: number) {
    let numberOfturns: number = amount / 90; // 1, 2 or 3
    for(let i = 0; i < numberOfturns; i++){
      this.turnLeft();
    }
  }
  turnLeft(){
    let currWpX = this.wpX;
    let currWpY = this.wpY;
    this.wpX = -1 * currWpY;
    this.wpY = currWpX;
  }

  goRight(amount: number) {
    let numberOfturns: number = amount / 90; // 1, 2 or 3
    for (let i = 0; i < numberOfturns; i++) {
      this.turnRight();
    }
  }
  turnRight(){
    let currWpX = this.wpX;
    let currWpY = this.wpY;
    this.wpX = currWpY;
    this.wpY = -1 * currWpX;
  }

  goForward(amount: number) {
    this.x = this.x + (amount * this.wpX);
    this.y = this.y + (amount * this.wpY);
  }
}