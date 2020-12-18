import { readFileSync } from "fs";
import { createInitialCubes, Cube } from "./cube";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  let map: Cube[] = [];
  createInitialCubes(input, map);
  console.log(map);
}



advent();