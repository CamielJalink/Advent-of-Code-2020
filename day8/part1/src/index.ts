import { readFileSync } from "fs";
import BootComputer from "./bootComputer";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  const bootComputer = new BootComputer(input);
  
  console.log(bootComputer.start());
}

advent();