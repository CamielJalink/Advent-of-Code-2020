export function parseTickets(stringTickets: string[]){
  let tickets: number[][] = [];
  for(let i = 1; i < stringTickets.length; i++){ // ignore the first "ticket" which is just the label.
    let stringTicket = stringTickets[i].split(',');
    let ticket: number[] = stringTicket.map((stringNumber) => Number(stringNumber));
    tickets.push(ticket);
  }
  return tickets;
}


export function parseRules(stringRules: string[]){
  const rules: Rule[] = [];
  for(let i = 0; i < stringRules.length; i++){
    let rule = new Rule(stringRules[i], i);
    rules.push(rule);
  }
  return rules;
}


export class Rule {
  ruleId: number;
  ruleName: string;
  lowLowerBound: number;
  lowUpperBound: number;
  highLowerBound: number;
  highUpperBound: number;

  constructor(stringRule: string, ruleId: number){
    this.ruleId = ruleId;
    let splitRule = stringRule.split(/: | or |-/g);
    this.ruleName = splitRule[0];
    this.lowLowerBound = Number(splitRule[1]);
    this.lowUpperBound = Number(splitRule[2]);
    this.highLowerBound = Number(splitRule[3]);
    this.highUpperBound = Number(splitRule[4]);
  }
}