import { readFileSync } from "fs";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const RulesAndMessages: string[] = stringInput.split("\r\n\r\n");
  console.log(input);
}

advent();