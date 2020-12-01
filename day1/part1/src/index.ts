import { readFileSync } from "fs";

function advent() {
  const stringInput: string[] = readFileSync("input.txt", "utf-8").split("\r\n");
  const input: number[] = stringInput.map((stringNum) => Number(stringNum));
  console.log(findPair(input));
}


function findPair(input: number[]){
  const intendedResult = 2020;
  let correctPair: number = 0;
  let correctTriplet: number = 0;

  input.forEach((num1) => {
    input.forEach((num2) => {
      input.forEach((num3) => {
        if(num1 + num2 + num3 === intendedResult){
          correctTriplet = num1*num2*num3;
        }
      })

      if(num1 + num2 === intendedResult){
        correctPair = num1*num2;
      }
    })
  })

  return "part one: " + correctPair.toString() + " part two: " + correctTriplet.toString();
}

advent();