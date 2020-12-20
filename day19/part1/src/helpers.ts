export class Rule{
  name: string;
  children: string[][] = [];
  childRules: Rule[][] = [];
  validAnswers: string[] = [];

  constructor(stringRule: string){
    let nameAndChildren = stringRule.split(":");
    this.name = nameAndChildren[0];

    if(nameAndChildren[1] === ' "a"'){
      this.children.push(["a"]);
    } 
    else if ( nameAndChildren[1] === ' "b"'){
      this.children.push(["b"]);
    }
    else{
      let childrenSets: string[] = nameAndChildren[1].split("|");
      const regex = /[0-9]/g;
      childrenSets.forEach((childrenSet: string) => {
        this.children.push(childrenSet.match(regex)!);
      })
    }
  }

  createValidAnswers(){

    for(let i = 0; i < this.childRules.length; i++){
      let setOfChildrules: Rule[] = this.childRules[i]; // Dit zou dus 4, 1, 5 kunnen zijn in dit geval.

      setOfChildrules.forEach((rule: Rule) => {
        let allChildValidAnswers = rule.createValidAnswers(); // Dus alle varianten van 4, dan van 1, dan van 5. 
      })
    }

    // Ik besta uit 4, 1 en 5.
    // mijn valide answers zijn dus: 
      // Alle valide combinaties van de valide answers van 4, gevolgd door 1, gevolgd door 5. 
    // Mijn valide answers zijn 

  }
}


// Connects rules to each other by-reference, and also returns the starting rule (named 0);
export function connectRules(rules: Rule[]): Rule {
  let startingRule: Rule;

  rules.forEach((rule: Rule) => {
    rule.children.forEach((childrenRule: string[]) => {
      let childRules: Rule[] = [];
      childrenRule.forEach((ruleName: string) => {
        for (let i = 0; i < rules.length; i++) {
          if (rules[i].name === ruleName) {
            childRules.push(rules[i]);
            break;
          }
        }
      })
      rule.childRules.push(childRules);
    })
    if(rule.name === '0'){
      startingRule = rule;
    }
  })
  return startingRule!;
}