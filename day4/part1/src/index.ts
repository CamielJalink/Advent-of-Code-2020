import { readFileSync } from "fs";
import { Property, parsePasswords, passwordHasProp } from "./helpers"

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n\r\n");

  console.log(countValidPassports(input));
}


function countValidPassports(passportsRaw: string[]){
  const parsedPasswords: Property[][] = parsePasswords(passportsRaw);
  let numValidPasswords: number = 0;

  parsedPasswords.forEach((password: Property[]) => {
    let passwordIsValid: boolean = false;
    if(password.length === 8){
      passwordIsValid = true;
    }
    else if(password.length === 7 && !passwordHasProp(password, "cid")){
      passwordIsValid = true;
    }
    if(passwordIsValid){
      numValidPasswords++;
    }
  });

  return numValidPasswords;
}



advent();