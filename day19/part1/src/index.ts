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
  checkMessageValidity(startingRule, messages);
}



function checkMessageValidity(startingRule: Rule, messages: string[]){
  // const allValidAnswers: Set<string> = new Set();
  startingRule.createValidAnswers();

  console.log(startingRule.childRules[0]);
}

advent();