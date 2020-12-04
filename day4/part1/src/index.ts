import { readFileSync } from "fs";
import { Property, parsePasswords, passwordHasProp, propIsValid } from "./helpers"

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n\r\n");

  countValidPassports(input);
}

function countValidPassports(passportsRaw: string[]){
  const parsedPasswords: Property[][] = parsePasswords(passportsRaw);
  
  let numPresentPasswords: number = 0; // The number of passwords that have all required fields 
  let numValidPasswords: number = 0;

  parsedPasswords.forEach((password: Property[]) => {
    let allPresent: boolean = false;
    if (password.length === 8 || (password.length === 7 && !passwordHasProp(password, "cid"))){
      numPresentPasswords++;
      allPresent = true;
    }

    let passwordIsValid: boolean = true;
    password.forEach((prop: Property) => {
      if(propIsValid(prop) === false){
        passwordIsValid = false;
        console.log("I FOUND A FAULTY PROP!")
      }
    })

    if(passwordIsValid && allPresent){
      numValidPasswords++;
    }
  });

  console.log("Number of passwords with all fields present: " + numPresentPasswords);
  console.log("Number of passwords that are valid " + numValidPasswords);
}

advent();