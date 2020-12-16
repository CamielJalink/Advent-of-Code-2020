import { readFileSync } from "fs";
import { addToSpokenBefore } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: number[] = stringInput.split(",").map((stringNum: string) => Number(stringNum));
  playGame(input);
}


function playGame(gameNumbers: number[]){
  let spokenBefore = new Map<number, number>();

  for(let i = 0; i < gameNumbers.length-1; i++){ // This '-1' is a real purrty magic number...
    spokenBefore.set(gameNumbers[i], i+1);
  }

  for (let turn = gameNumbers.length; turn < 30000000; turn++){  // We don't start in turn 1, since we first speak start numbers
    const lastSpoken: number = gameNumbers[gameNumbers.length-1];
    const nextNumber = addToSpokenBefore(spokenBefore, lastSpoken, turn);
    gameNumbers.push(nextNumber);
  }

  console.log(gameNumbers[gameNumbers.length-1]);
}


advent();