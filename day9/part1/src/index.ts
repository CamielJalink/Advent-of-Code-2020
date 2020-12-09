import { readFileSync } from "fs";
import { updatePreamble, isValidNumber } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: number[] = stringInput.split("\r\n").map((stringNum: string) => {
    return Number(stringNum);
  });

  findFirstXmasNumber(input, 25);
}

advent();


function findFirstXmasNumber(input: number[], preambleLength: number){ // preamble is length 5 for now.
  const preamble: number[] = [];

  for(let i = 0; i < preambleLength; i++){
    preamble[i] = i;
  }

  for(let i = preamble.length; i < input.length; i++){
    const nextNum = input[i];

    if(!isValidNumber(input, preamble, nextNum)){
      console.log("Invalid number found: " + nextNum);
      break;
    }

    updatePreamble(preamble);
  }
}