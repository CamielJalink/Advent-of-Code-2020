import { readFileSync } from "fs";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");

  findJoltage(input);
}


function findJoltage(input: string[]){
  const numInput = input.map((stringVoltage) => Number(stringVoltage));
  const sortedInput = numInput.sort((a, b) => {
    if(a < b){
      return -1;
    } else if(b < a){
      return 1;
    } else{
      return 0;
    }
  });

  let maxAdapterVoltage: number = 0;
  sortedInput.forEach((adapterVoltage) => {
    if(adapterVoltage > maxAdapterVoltage){
      maxAdapterVoltage = adapterVoltage;
    }
  })
  sortedInput.unshift(0); // The 0-adapter from the outlet
  sortedInput.push(maxAdapterVoltage + 3); // Add phone's adapter, which is 3 + the highest, to the list

  count1sAnd3s(sortedInput);
  console.log(sortedInput);
}


function count1sAnd3s(sortedInput: number[]){
  let num1s: number = 0;
  let num3s: number = 0; 

  for(let i = 0; i < sortedInput.length; i++){
    if(sortedInput[i+1] - sortedInput[i] === 1){
      num1s++;
    }
    else if(sortedInput[i+1] - sortedInput[i] === 3){
      num3s++;
    }
  }

  console.log("This many one-steps:", num1s);
  console.log("This many three-steps:", num3s);
  console.log("Multiplied", num1s*num3s);
}


advent();