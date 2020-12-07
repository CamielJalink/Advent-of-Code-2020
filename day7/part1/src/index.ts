import { readFileSync } from "fs";
import { parseRules, BagRule } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const rules: string[] = stringInput.split("\r\n");
  findBagColorsContainingGold(rules);
}



function findBagColorsContainingGold(rules: string[]){
  let bagRuleSet: BagRule[][] = parseRules(rules);

  let differentColors: Set<string> = new Set();     // This should become a Set!

  bagRuleSet.forEach((bagRules: BagRule[]) => {

    // Je moet niet de outermost bag pakken, maar de parentbag
    for(let i = 0; i < bagRules.length; i++){

      if(i > 0 && bagRules[i].color === 'gold' && bagRules[i].adjective === 'shiny'){
        differentColors.add(bagRules[i-1].color);
      }
    }
  })

  console.log(differentColors);
}

advent();