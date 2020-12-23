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
  const winningPlayer: string = game.playUntilWinner();
  if(winningPlayer === "Player 1"){
    console.log("Player 1 won the game with ", game.player1.calculateScore(), " points");
  } else if (winningPlayer === "Player 2"){
    console.log("Player 2 won the game with ", game.player2.calculateScore(), " points");
  }
  else{
    console.log("ERROR FOR ", winningPlayer);
  }
}


advent();