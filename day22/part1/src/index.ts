import { readFileSync } from "fs";
import { Game } from "./game";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const stringHands: string[] = stringInput.split("\r\n\r\n");
  const player1StringInput: string[] = stringHands[0].split("\r\n");
  const player2StringInput: string[] = stringHands[1].split("\r\n");
  player1StringInput.shift();
  player2StringInput.shift();
  const player1Input: number[] = player1StringInput.map((stringCard: string) => Number(stringCard));
  const player2Input: number[] = player2StringInput.map((stringCard: string) => Number(stringCard));
  const game: Game = new Game(player1Input, player2Input);
  const winningScore: number = game.playUntilWinner();
  console.log(winningScore);
}


advent();