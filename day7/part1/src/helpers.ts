export function parseRules(rules: string[]) {
  let bagRuleSet: BagRule[][] = [];
  
  rules.forEach((ruleSet: string) => {
    let bagRules: BagRule[] = [];
    ruleSet.split(/ contain |, /).forEach((bagRuleString: string) => {
      if(bagRuleString !== 'no other bags.'){
        bagRules.push(new BagRule(bagRuleString));
      }
    })
    bagRuleSet.push(bagRules);
  })

  return bagRuleSet;
}


// Kan ik een rule opsplitsen in bags? 
export class BagRule{
  amount: number = 1;
  adjective: string;
  color: string;

  constructor(bagRuleString: string){
    let stringProperties = bagRuleString.split(' ');
    
    if(!isNaN(Number(stringProperties[0]))){
      this.amount = Number(stringProperties[0]);
      stringProperties.shift();
    }

    this.adjective = stringProperties[0];
    this.color = stringProperties[1];
  }
}