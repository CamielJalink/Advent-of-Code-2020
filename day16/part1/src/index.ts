import { readFileSync } from "fs";
import { Rule, parseRules, parseTickets, Column, parseColumns } from "./helpers";


function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n\r\n");
  const stringRules: string[] = input[0].split("\r\n");
  const stringTickets: string[] = input[2].split("\r\n");
  const myTicket: string[] = input[1].split("\r\n");
  let tickets: number[][] = parseTickets(stringTickets);
  const rules: Rule[] = parseRules(stringRules);
  tickets = determineErrorRate(rules, tickets);
  const columns: Column[] = parseColumns(tickets);
  matchRulesAndColumns(rules, columns);
  parseMyTicket(myTicket, rules, columns);
}


function determineErrorRate(rules: Rule[], tickets: number[][]){
  const filteredTickets: number[][] = [];

  tickets.forEach((ticket: number[]) => {
    let ticketIsValid: boolean = true;
    ticket.forEach((num: number) => {
      let numIsValid: boolean = false;

      for(let i = 0; i < rules.length; i++){
        if ((num >= rules[i].lowLowerBound && num <= rules[i].lowUpperBound) || (num >= rules[i].highLowerBound && num <= rules[i].highUpperBound)){
          numIsValid = true;
        }
      }

      if(!numIsValid){
        ticketIsValid = false;
      }
    })

    if(ticketIsValid){
      filteredTickets.push(ticket);
    }
  })

  return filteredTickets;
}


function matchRulesAndColumns(rules: Rule[], columns: Column[]){
  columns.forEach((column: Column) => {
    column.rules = rules;
    column.filterRules();
  })

  let keepFiltering: boolean = true;
  while(keepFiltering){
    let columnWithMultipleRulesExists: boolean = false;

    columns.forEach((column: Column) => {
      if(column.validRules.length === 1){
        filterClaimedRules(column, columns, column.validRules[0]);
      }
    })

    columns.forEach((column: Column) => {
      if(column.validRules.length > 1){
        columnWithMultipleRulesExists = true;
      }
    })

    if (!columnWithMultipleRulesExists){
      keepFiltering = false;
    }
  }
}


function filterClaimedRules(owningColumn: Column, columns: Column[], claimedRule: Rule){
  columns.forEach((column) => {
    if(column !== owningColumn){
      const newRules: Rule[] = [];
      column.validRules.forEach((rule: Rule) => {
        if(rule !== claimedRule){
          newRules.push(rule);
        }
      })
      column.validRules = newRules;
    }
  })
}


function parseMyTicket(myTicket: string[], rules: Rule[], columns: Column[]){
  const myTicketStringNumbers: string[] = myTicket[1].split(',');
  const myTicketNumbers: number[] = myTicketStringNumbers.map((stringNum: string) => Number(stringNum));

  const departureRules: Rule[] = [];
  rules.forEach((rule: Rule) => {
    if(rule.isDeparture){
      departureRules.push(rule);
    }
  })

  const relevantRuleIds: number[] = [];
  columns.forEach((column: Column) => {
    if(departureRules.includes(column.validRules[0])){
      relevantRuleIds.push(column.ticketNumberId);
    }
  })

  let productOfDepartureValues: number = 1;
  for(let i = 0; i < myTicketNumbers.length; i++){
    if(relevantRuleIds.includes(i)){
      productOfDepartureValues *= myTicketNumbers[i];
    }
  }

  console.log(productOfDepartureValues);
}


advent();