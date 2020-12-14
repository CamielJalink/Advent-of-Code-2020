import { readFileSync } from "fs";
import { applyMaskToDecimal } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  parseInstructions(input);
}


function parseInstructions(input: string[]){
  let memory: number[] = [];
  let currentMask: string;
  
  input.forEach((line: string) => {
    let lineProps: string[] = line.split(" = ");
    if(lineProps[0] === 'mask'){
      currentMask = lineProps[1];
    }
    else{
      const targetMemory = Number(lineProps[0].match(/\d+/)); // Find the memory slot that we want to overwrite
      const decimalValue = Number(lineProps[1]);
      memory[targetMemory] = applyMaskToDecimal(currentMask, decimalValue);
    }
  });

  let sumInMemory: number = memory.reduce((acc:number, num:number) => acc + num);
  console.log("All values in memory put together are: ", sumInMemory);
}


advent();