import { readFileSync } from "fs";
import { Game } from "./game";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const startingGameState: number[] = stringInput.split("").map((num: string) => Number(num));
  const game = new Game(startingGameState);

  for(let i = 0; i < 100; i++){
    game.playMove();
    // game.printState();
  }

  game.cupsAfter1();
}

advent();