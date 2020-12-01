import { readFileSync } from "fs";

function advent() {
  let stringInput: string = readFileSync("input.txt", "utf-8");
  let input: string[] = stringInput.split("\n");
  console.log(input);
}

advent();