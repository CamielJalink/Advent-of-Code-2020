import { readFileSync } from "fs";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  
  let numValidSledPasswords: number = 0;     // Answer for part 1
  let numValidTobogganPasswords: number = 0; // Answer for part 2

  input.forEach((passwordLine: string) => {
    const parsedPassword: string[] = passwordLine.split(/\W/); // split password string on '-', ':' and space
    parsedPassword.splice(3,1);                              // remove empty string element in the array at index 3.

    if(checkSledPasswordValid(Number(parsedPassword[0]), Number(parsedPassword[1]), parsedPassword[2], parsedPassword[3])){
      numValidSledPasswords++;
    }
    if (checkTobogganPasswordValid(Number(parsedPassword[0]), Number(parsedPassword[1]), parsedPassword[2], parsedPassword[3])){
      numValidTobogganPasswords++;
    }
  })

  console.log("Number of valid sled passwords is: ", numValidSledPasswords);
  console.log("Number of valid toboggan passwords is: ", numValidTobogganPasswords);
}



function checkSledPasswordValid(policyLowerBound:number, policyUpperBound: number, policyLetter: string, password: string): boolean{
  let policyLetterCount = 0;
  for(let i = 0; i < password.length; i++){
    if(password[i] === policyLetter){
      policyLetterCount++;
    }
  }
  return (policyLetterCount >= policyLowerBound && policyLetterCount <= policyUpperBound);
}



function checkTobogganPasswordValid(firstPosition: number, secondPosition: number, policyLetter: string, password: string): boolean {
  firstPosition--;  // No 0-index
  secondPosition--; // No 0-index

  let validPositions: number = 0;
  if(password.substring(firstPosition, firstPosition + 1) === policyLetter){
    validPositions++;
  }
  if (password.substring(secondPosition, secondPosition + 1) === policyLetter) {
    validPositions++;
  }
  return validPositions === 1;
}

advent();