import { readFileSync } from "fs";
import { Map } from "./cube";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  const map = new Map(input);
  activeAfter6Cycles(map);
}


function activeAfter6Cycles(map: Map){
  for(let i = 0; i < 6; i++){
    map.cycle();
  }
  console.log(map.countActive());
}


advent();