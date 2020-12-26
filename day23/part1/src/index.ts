import { readFileSync } from "fs";
import { Game } from "./game";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  let startingGameState: number[] = stringInput.split("").map((num: string) => Number(num));
  const game = new Game(startingGameState);
}

advent();