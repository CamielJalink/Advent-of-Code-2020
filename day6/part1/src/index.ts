import { readFileSync } from "fs";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n\r\n");
  findNumGroupAnswers(input);
}


function findNumGroupAnswers(groupAnswersRaw: string[]){
  const groupAnswers: string[][] = groupAnswersRaw.map((rawGroup) => {
    return rawGroup.split("\r\n");
  })

  let totalFoundAnswers: number = 0;
  let totalSharedAnswers: number = 0;

  groupAnswers.forEach((group: string[]) => {
    const foundAnswers: string[] = [];

    group.forEach((answerSheet: string) => {
      for(let i = 0; i < answerSheet.length; i++){
        if (!foundAnswers.includes(answerSheet[i])){
          foundAnswers.push(answerSheet[i]);
        }
      }
    })

    foundAnswers.forEach((answer: string) => {
      let answerIsShared: boolean = true;
      group.forEach((answerSheet: string) => {
        if (!answerSheet.includes(answer)) {
          answerIsShared = false;
        }
      })
      if (answerIsShared) {
        totalSharedAnswers++;
      }
    })

    totalFoundAnswers += foundAnswers.length;
  })

  
  console.log("Number of total different-answers-per-group is: " + totalFoundAnswers);
  console.log("Number of total shared-answers-per-group is: " + totalSharedAnswers);
}

advent();