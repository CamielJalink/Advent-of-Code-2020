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
  isDeparture: boolean = false;
  lowLowerBound: number;
  lowUpperBound: number;
  highLowerBound: number;
  highUpperBound: number;

  constructor(stringRule: string, ruleId: number){
    this.ruleId = ruleId;
    let splitRule = stringRule.split(/: | or |-/g);
    this.ruleName = splitRule[0];
    if (this.ruleName.split(' ')[0] === "departure"){
      this.isDeparture = true;
    }
    this.lowLowerBound = Number(splitRule[1]);
    this.lowUpperBound = Number(splitRule[2]);
    this.highLowerBound = Number(splitRule[3]);
    this.highUpperBound = Number(splitRule[4]);
  }

  isValidNumber(num: number){
    if ((num >= this.lowLowerBound && num <= this.lowUpperBound) || (num >= this.highLowerBound && num <= this.highUpperBound)) {
      return true;
    }
    else{
      return false;
    }
  }
}


export function parseColumns(tickets: number[][]){
  const columns: Column[] = [];
  for(let i = 0; i < tickets[0].length; i++){ // For every number in a ticket, create a column.
    let columnNumbers: number[] = [];

    tickets.forEach((ticket: number[]) => {
      columnNumbers.push(ticket[i]);
    })

    columns.push(new Column(i, columnNumbers));
  }
  return columns;
}


export class Column {
  ticketNumberId: number;
  numbers: number[] = [];
  rules: Rule[] = [];
  validRules: Rule[] = [];

  constructor(ticketNumberId: number, columnNumbers: number[]){
    this.ticketNumberId = ticketNumberId;
    this.numbers = columnNumbers;
  }

  filterRules(){
    this.rules.forEach((rule: Rule) => {
      let ruleIsValid: boolean = true;
      for(let i = 0; i < this.numbers.length; i++){
        if(rule.isValidNumber(this.numbers[i]) === false){
          ruleIsValid = false;
          break;
        }
      }
      if(ruleIsValid){
        this.validRules.push(rule);
      }
    })
  }
}