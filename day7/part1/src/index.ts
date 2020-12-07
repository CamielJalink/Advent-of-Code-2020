import { readFileSync } from "fs";
import { parseRules, BagRule } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const rules: string[] = stringInput.split("\r\n");
  findBagColorsContainingGold(rules);
}


function findBagColorsContainingGold(rules: string[]){
  const bagRules: BagRule[] = parseRules(rules);

  let numBagsContainingGold: number = 0;
  let bagsNeeded: number = 0;

  bagRules.forEach((bagRule: BagRule) => {
    if(bagRule.checkIfContainsColor("shiny gold")){
      numBagsContainingGold++;
    }

    if(bagRule.name === "shiny gold"){
      bagsNeeded = bagRule.countAllBags() - 1;
    }
  })

  console.log("Answer part one", numBagsContainingGold);
  console.log("I need to own this many bags", bagsNeeded);
}

advent();