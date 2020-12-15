import { readFileSync } from "fs";
import { applyMaskToMemory } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  parseInstructions(input);
}


function parseInstructions(input: string[]){
  const memory: Memory[] = [];
  let currentMask: string;
  
  input.forEach((line: string) => {
    const lineProps: string[] = line.split(" = ");
    if(lineProps[0] === 'mask'){
      currentMask = lineProps[1];
    }
    else{
      const targetMemory = Number(lineProps[0].match(/\d+/));
      const decimalValue = Number(lineProps[1]);
      const memoryTargets: number[] = applyMaskToMemory(currentMask, targetMemory);

      memoryTargets.forEach((num: number) => {
        let numIndexExists: boolean = false;
        for(let i = 0; i < memory.length; i++){
          if(memory[i].index === num){
            memory[i].value = decimalValue;
            numIndexExists = true;
            break;
          }
        }
        if(!numIndexExists){
          memory.push({index: num, value: decimalValue})
        }
      })
    }
  });

  let sumInMemory: number = 0;
  memory.forEach((memory: Memory) => {
    sumInMemory += memory.value;
  })
  console.log("All values in memory put together are: ", sumInMemory);
}


interface Memory{
  index: number,
  value: number
}


advent();