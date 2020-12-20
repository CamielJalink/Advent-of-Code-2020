import { readFileSync } from "fs";
import { Rule, connectRules } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const rulesAndMessages: string[] = stringInput.split("\r\n\r\n");
  const messages = rulesAndMessages[1].split("\r\n");
  const stringRules = rulesAndMessages[0].split("\r\n");
  const rules: Rule[] = stringRules.map((stringRule) => {
    return new Rule(stringRule);
  })
  const startingRule: Rule = connectRules(rules);

  // console.log(rules[0]);
  // console.log(rules[1]);

  checkMessageValidity(startingRule, rules, messages);
}



function checkMessageValidity(startingRule: Rule, rules: Rule[], messages: string[]){
  const allAnswers = startingRule.createValidAnswers();
  let numValidMessages: number = 0;

  messages.forEach((message: string) => {
    if(allAnswers.includes(message)){
      numValidMessages++;
    }
  })

  console.log(allAnswers);
  console.log("Number of valid messages: ", numValidMessages);
}

advent();