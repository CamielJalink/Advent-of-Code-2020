import { readFileSync } from "fs";
import { updatePreamble, isValidNumber } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: number[] = stringInput.split("\r\n").map((stringNum: string) => {
    return Number(stringNum);
  });

  const xmasNumber: number = findFirstXmasNumber(input, 25);
  findEncryptionWeakness(input, xmasNumber);
}

advent();


function findFirstXmasNumber(input: number[], preambleLength: number){
  const preamble: number[] = [];
  let xmasNumber: number = 0;

  for(let i = 0; i < preambleLength; i++){
    preamble[i] = i;
  }

  for(let i = preamble.length; i < input.length; i++){
    const nextNum = input[i];

    if(!isValidNumber(input, preamble, nextNum)){
      console.log("Invalid number found: " + nextNum);
      xmasNumber = nextNum;
      break;
    }

    updatePreamble(preamble);
  }
  return xmasNumber;
}


function findEncryptionWeakness(input: number[], target: number){
  let foundNumbers: boolean = false;
  let attempt: number[] = [];

  for(let i = 0; i < input.length; i++){
    attempt = [];
    attempt.push(input[i]);

    for(let j = 0; j < input.length; j++){
      if(j > i){
        let attemptSum: number = 0;
        attempt.forEach((num: number) => attemptSum += num);

        if(attemptSum + input[j] > target){
          break;
        }
        else if(attemptSum + input[j] === target){
          attempt.push(input[j]);
          foundNumbers = true; 
          break;
        }
        else{
          attempt.push(input[j]);
        }
      }
    }

    if(foundNumbers){
      break;
    }
  }

  console.log("correct numbers found are in this attempt:" + attempt);
  let lowestNum: number = attempt[0];
  let highestNum: number = attempt[0];
  attempt.forEach((num: number) => {
    if(num > highestNum){
      highestNum = num;
    }
    if(num < lowestNum){
      lowestNum = num;
    }
  })

  const encryptionWeakness = lowestNum + highestNum;
  console.log("Encryption weakness is: " + encryptionWeakness);
}