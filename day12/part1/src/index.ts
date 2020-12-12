import { readFileSync } from "fs";
import { Command, parseCommands, Ferry } from "./helpers"

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  const commands: Command[] = parseCommands(input);
  findDestination(commands);
}


function findDestination(commands: Command[]){
  const ferry: Ferry = new Ferry();

  commands.forEach((command: Command) => {
    switch (command.direction) {
      case 'N':
        ferry.goNorth(command.argument);
        break;
      case 'S':
        ferry.goSouth(command.argument);
        break;
      case 'E':
        ferry.goEast(command.argument);
        break;
      case 'W':
        ferry.goWest(command.argument);
        break;
      case 'L':
        ferry.goLeft(command.argument);
        break;
      case 'R':
        ferry.goRight(command.argument);
        break;
      case 'F':
        ferry.goForward(command.argument);
        break;
      default:
        throw new Error("This commands direction is illegal!")
        break;
    }
  })

  console.log("After these instructions, the ferry is at " + ferry.x + "," + ferry.y);
  const manhattenPosition = Math.abs(ferry.x) + Math.abs(ferry.y);
  console.log("Manhatten position", manhattenPosition);
}


advent();