import { readFileSync } from "fs";
import { Game } from "./game";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const startingGameState: number[] = stringInput.split("").map((num: string) => Number(num));
  
  for (let i = 10; i <= 1000000; i++){
    startingGameState.push(i);
  }

  const game = new Game(startingGameState);
  
  for (let i = 0; i < 10000000; i++){
    game.playMove();
  }

  game.findTwoCupsAfter1();
}

advent();