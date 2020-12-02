import { readFileSync } from "fs";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  
  let numValidSledPasswords: number = 0;     // Answer for part 1
  let numValidTobogganPasswords: number = 0; // Answer for part 2

  // Check each password individually, and update the number of correct passwords on a positive response.
  input.forEach((passwordLine: string) => {
    let parsedPassword: string[] = passwordLine.split(/\W/); // split password string on '-', ':' and space
    parsedPassword.splice(3,1);                              // remove empty string element in the array.

    if(checkSledPasswordValid(Number(parsedPassword[0]), Number(parsedPassword[1]), parsedPassword[2], parsedPassword[3])){
      numValidSledPasswords++;
    }
    // if(checkTobogganPasswordValid()){
    //   numValidTobogganPasswords++;
    // }
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

advent();