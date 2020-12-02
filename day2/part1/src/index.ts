import { readFileSync } from "fs";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  
  let numValidPasswords = 0;
  input.forEach((passwordLine: string) => {
    if(checkPasswordValid(passwordLine)){
      numValidPasswords++;
    }
  })
  console.log(numValidPasswords);
}


function checkPasswordValid(passwordLine: string): boolean{
  const passLineArray: string[]  = passwordLine.split(": ");
  const password: string         = passLineArray[1];
  const policy: string[]         = passLineArray[0].split(" ");
  const policyLetter: string     = policy[1];
  const policyNumbers: string[]  = policy[0].split("-");
  const policyLowerBound: number = Number(policyNumbers[0]);
  const policyUpperBound: number = Number(policyNumbers[1]);

  // Regular expression gebruiken om te splitten op meerdere zaken? 

  let policyLetterCount = 0;
  for(let i = 0; i < password.length; i++){
    if(password[i] === policyLetter){
      policyLetterCount++;
    }
  }

  if(policyLetterCount >= policyLowerBound && policyLetterCount <= policyUpperBound ){
    return true;
  } else{
    return false;
  }
}

advent();