import { readFileSync } from "fs";
import { Game } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const stringHands: string[] = stringInput.split("\r\n\r\n");
  const game: Game = new Game(stringHands);
  const winningScore: number = game.playUntilWinner();
  console.log(winningScore);
}


advent();