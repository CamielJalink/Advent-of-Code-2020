import { readFileSync } from "fs";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n\r\n");
  console.log(sumGroupAnswers(input));
}


function sumGroupAnswers(rawGroupAnswers: string[]){
  const groupAnswers: string[][] = rawGroupAnswers.map((rawGroup) => {
    return rawGroup.split("\r\n");
  })

  let totalFoundAnswers: number = 0;

  groupAnswers.forEach((group: string[]) => {
    const foundAnswers: string[] = [];
    group.forEach((answer: string) => {
      for(let i = 0; i < answer.length; i++){
        if(!foundAnswers.includes(answer[i])){
          foundAnswers.push(answer[i]);
        }
      }
    })
    totalFoundAnswers += foundAnswers.length;
  })

  return totalFoundAnswers;
}

advent();