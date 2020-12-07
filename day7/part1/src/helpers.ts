export function parseRules(rules: string[]) {
  let bagRules: BagRule[] = [];
  
  rules.forEach((rule: string) => {
    bagRules.push(new BagRule(rule));
  })

  bagRules.forEach((bagRule: BagRule) => {
    bagRule.childrenNames.forEach((bagRuleName: string) => {
      bagRules.forEach((childRule: BagRule) => {
        if(childRule.name === bagRuleName){
          bagRule.children.push(childRule);
        }
      })
    });
  })

  return bagRules;
}



export class BagRule{
  name: string = "";
  childrenNames: string[] = [];
  childrenAmounts: number[] = [];  // [5, 3]
  children: BagRule[] = [];   // [Rood, Blauw]

  constructor(rule: string){
    let bags = rule.split(/ contain |, /);
    let bagString = bags[0].split(' ');
    bagString.pop();
    this.name = bagString[0] + " " + bagString[1];
    
    if(bags[1] !== 'no other bags.'){
      for(let i = 1; i < bags.length; i++){
        let bagSplit: string[] = bags[i].split(' ');
        this.childrenNames.push(bagSplit[1] + " " + bagSplit[2]);
        this.childrenAmounts.push(Number(bagSplit[0]));
      }
    }
  }

  checkIfContainsColor(color: string): boolean{
    let containsColor: boolean = false;

    this.children.forEach((child: BagRule) => {
      if(child.name === color){
        containsColor = true;
      }
    })

    if(!containsColor){
      this.children.forEach((child: BagRule) => {
        if(child.checkIfContainsColor(color)){
          containsColor = true;
        }
      })
    }

    return containsColor;
  }


  countAllBags(){
    let numBags = 0;

    if(this.children.length === 0){  // 
      return 1;
    }
    else{
      for(let i = 0; i < this.childrenAmounts.length; i++){
        numBags += this.childrenAmounts[i] * this.children[i].countAllBags();
      }
      numBags++;
    }

    return numBags;
  }
}