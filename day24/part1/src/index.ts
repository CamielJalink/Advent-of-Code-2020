import { readFileSync } from "fs";
import { Floor } from "./floor";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  const floor: Floor = new Floor();
  floor.flipAllTiles(input);
  console.log("Part 1 answer: " + floor.countAllColored());
  floor.checkBlackTiles100Days();
}

// There is a bug in my part2 answer... if you subtract 1 from the output you have the correct answer.

advent();