import { readFileSync } from "fs";
import { updatePreamble, isValidNumber } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: number[] = stringInput.split("\r\n").map((stringNum: string) => {
    return Number(stringNum);
  });

  const xmasNumber: number = findFirstXmasNumber(input, 25);
  findEncryptionWeakness([3,9,8,4,2], 15);
}

advent();


function findFirstXmasNumber(input: number[], preambleLength: number){ // preamble is length 5 for now.
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


function findEncryptionWeakness(input: number[], attempt: number[], target: number){

  for(let i = 0; i < input.length; i++){

    if(input[i] < target){
      attempt.push(input[i])
      let res = recursiveCheck(input, attempt, target);
      if(res === [-1]){
        console.log("AWWW YISS")
      }
    }
  }
}



          // - Probeer de vergelijking niet met hetzelfde getal, dus niet input[i] + input2[i];

          // Als alles in attempt + input2[i] === target.
            // Jay, we got em!

          // Als alles in attempt + input2[i] > target
            // deze is het niet, doe input2[i+1]
          
          // Else
            // Voeg input2[i] toe aan 'attempt'
            // Stap een laag dieper (recursie)