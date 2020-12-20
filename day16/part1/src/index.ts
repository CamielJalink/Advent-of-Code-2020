import { readFileSync } from "fs";
import { Rule, parseRules, parseTickets } from "./helpers";


function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n\r\n");
  const stringRules: string[] = input[0].split("\r\n");
  const stringTickets: string[] = input[2].split("\r\n");
  const tickets: number[][] = parseTickets(stringTickets);
  const rules: Rule[] = parseRules(stringRules);
  determineErrorRate(rules, tickets);
}


function determineErrorRate(rules: Rule[], tickets: number[][]){
  const faultyNumbers: number[] = [];

  tickets.forEach((ticket: number[]) => {
    ticket.forEach((num: number) => {
      let numIsValid: boolean = false;

      for(let i = 0; i < rules.length; i++){
        if ((num >= rules[i].lowLowerBound && num <= rules[i].lowUpperBound) || (num >= rules[i].highLowerBound && num <= rules[i].highUpperBound)){
          numIsValid = true;
        }
      }

      if(!numIsValid){
        faultyNumbers.push(num);
      }
    })
  })

  console.log("Total ticket error scanning rate is: ", faultyNumbers.reduce((acc, num) => acc + num));
}


advent();