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
  direction: string = 'E';
  x: number = 0;
  y: number = 0;

  constructor(){}

  goNorth(amount: number){
    this.y += amount;
  }
  goSouth(amount: number) {
    this.y -= amount;
  }
  goEast(amount: number) {
    this.x += amount;
  }
  goWest(amount: number) {
    this.x -= amount;
  }

  goLeft(amount: number) {
    let numberOfturns: number = amount / 90; // 1, 2 or 3
    for(let i = 0; i < numberOfturns; i++){
      this.turnLeft();
    }
  }
  turnLeft(){
    switch (this.direction) {
      case 'N':
        this.direction = 'W'
        break;
      case 'S':
        this.direction = 'E'
        break;
      case 'W':
        this.direction = 'S'
        break;
      case 'E':
        this.direction = 'N'
        break;
      default:
        throw new Error('that is not a valid value for this.direction');
    }
  }

  goRight(amount: number) {
    let numberOfturns: number = amount / 90; // 1, 2 or 3
    for (let i = 0; i < numberOfturns; i++) {
      this.turnRight();
    }
  }
  turnRight(){
    switch (this.direction) {
      case 'N':
        this.direction = 'E'
        break;
      case 'S':
        this.direction = 'W'
        break;
      case 'W':
        this.direction = 'N'
        break;
      case 'E':
        this.direction = 'S'
        break;
      default:
        throw new Error('that is not a valid value for this.direction');
    }
  }

  goForward(amount: number) {
    switch (this.direction) {
      case 'N':
        this.goNorth(amount);
        break;
      case 'S':
        this.goSouth(amount);
        break;
      case 'E':
        this.goEast(amount);
        break;
      case 'W':
        this.goWest(amount);
        break
      default:
        throw new Error('go forward is attempted without a valid direction in "this.direction"');
    }
  }
}