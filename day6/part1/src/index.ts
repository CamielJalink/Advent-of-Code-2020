import { readFileSync } from "fs";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n\r\n");

  const groupAnswers: string[][] = input.map((rawGroup) => {
    return rawGroup.split("\r\n");
  })

  console.log(sumGroupAnswers(groupAnswers));
  console.log(sumGroupSharedAnswers(groupAnswers));
}


function sumGroupAnswers(groupAnswers: string[][]){
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


function sumGroupSharedAnswers(groupAnswers: string[][]){
  let totalSharedAnswers: number = 0;

  groupAnswers.forEach((group: string[]) => {
    const foundAnswers: string[] = [];
    const foundSharedAnswers: string[] = [];
    group.forEach((answerSheet: string) => {
      for(let i = 0; i < answerSheet.length; i++){
        if(!foundAnswers.includes(answerSheet[i])){
          foundAnswers.push(answerSheet[i]);
        }
      }
    })

    foundAnswers.forEach((answer: string) => {
      let answerIsShared: boolean = true;
      group.forEach((answerSheet: string) => {
        if(!answerSheet.includes(answer)){
          answerIsShared = false;
        }
      })

      if(answerIsShared){
        totalSharedAnswers++;
      }
    })
  })

  return totalSharedAnswers;
}


advent();