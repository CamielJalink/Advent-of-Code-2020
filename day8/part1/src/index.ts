import { readFileSync } from "fs";
import BootComputer from "./bootComputer";
import { bruteForceFixInputs } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");

  // Part 1
  let bootComputer = new BootComputer(input);
  // console.log(bootComputer.start());

  // Part 2
  const bruteForceFixedInputs: string[][] = bruteForceFixInputs(input);

  bruteForceFixedInputs.forEach((fixedInput: string[])=> {
    let bootComputer = new BootComputer(fixedInput);
    console.log(bootComputer.start());
  })
  // Hier dan iets van een forEach om te kijken of hij werkt.
}

advent();