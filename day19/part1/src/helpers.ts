export class Rule{
  name: string;
  children: string[][] = [];
  childRulesSets: Rule[][] = [];
  validAnswers: string[] = [];


  constructor(stringRule: string){
    const nameAndChildren = stringRule.split(":");
    this.name = nameAndChildren[0];

    if(nameAndChildren[1] === ' "a"'){
      this.validAnswers.push("a");
    } 
    else if ( nameAndChildren[1] === ' "b"'){
      this.validAnswers.push("b");
    }
    else{
      const childrenSets: string[] = nameAndChildren[1].split("|");
      const regex = /[0-9]/g;
      childrenSets.forEach((childrenSet: string) => {
        this.children.push(childrenSet.match(regex)!);
      })
    }
  }

  
  createValidAnswers(): string[] {
    if(this.childRulesSets.length === 0){
      return this.validAnswers;
    } else{

      // ik ben 1, ik erwacht voor 2,2 en voor 3,3 een antwoord
      this.childRulesSets.forEach((childRules: Rule[]) => {

        // Ik zoek 2,2.
        let validAnswerStarts: string[] = [];
        

        for(let i = 0; i < childRules.length; i++){
          const childRule = childRules[i]; // Bv regel 2
          const validChildAnswers = childRule.createValidAnswers();

          let validAnswer: string = '';

           // Voor de eerste 2, geef me al je answers.
          // validAnswers zijn nu "a" of "b", die krijg ik in een array terug.
          
          validChildAnswers.forEach((validChildAnswer: string) => {
            validAnswer = validChildAnswer;
          })
        }


        // Dit stukje hieronder werkt voor 1 childRuleSet.
        childRules.forEach((childRule: Rule) => {
          let childValidAnswers: string[] = childRule.createValidAnswers();
          childValidAnswers.forEach((validChildAnswer: string) => {

          })

        })

        this.validAnswers.push(...childRulesValidAnswers);
      })
      return this.validAnswers;
    }
  }
}


// Connects rules to each other by-reference, and also returns the starting rule (named 0);
export function connectRules(rules: Rule[]): Rule {
  let startingRule: Rule = rules[0];

  rules.forEach((rule: Rule) => {
    rule.children.forEach((childrenRule: string[]) => {
      const childRules: Rule[] = [];
      childrenRule.forEach((ruleName: string) => {
        for (let i = 0; i < rules.length; i++) {
          if (rules[i].name === ruleName) {
            childRules.push(rules[i]);
            break;
          }
        }
      })
      if(rule.name !== 'a' && rule.name !== 'b'){
        rule.childRulesSets.push(childRules);
      }
    })
    if(rule.name === '0'){
      startingRule = rule;
    }
  })

  return startingRule;
}