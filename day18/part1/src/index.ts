import { readFileSync } from "fs";
import { parseExpressions, findClosingBracket, findFullNumber } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  const expressions: string[] = parseExpressions(input);
  let result: number = 0;
  expressions.forEach((expression: string) => {
    result += solveExpression(expression);
  })
  console.log("Result of adding all numbers together is: ", result);
}


function solveExpression(expression: string): number{
  let expressionArray: any[] = [];

  for(let i = 0; i < expression.length; i++){
    if(isNaN(Number(expression[i])) === false){
      expressionArray.push(findFullNumber(expression, i));
    }
    else if(expression[i] === '('){
      let closingBracketI: number = findClosingBracket(expression, i);
      let innerExpression: string = expression.substring(i+1, closingBracketI);
      i = closingBracketI;
      expressionArray.push(innerExpression);
    }
    else{
      expressionArray.push(expression[i]);
    }
  }


  if(isNaN(expressionArray[0])){
    expressionArray[0] = solveExpression(expressionArray[0]);
  }
  let result = expressionArray.shift();
  

  while(expressionArray.length > 1){
    let sign  = expressionArray[0];
    let elem2 = expressionArray[1];

    if(isNaN(elem2)){
      elem2 = solveExpression(elem2);
    }

    result = solveOneStep(result, sign, elem2);
    expressionArray.shift();
    expressionArray.shift();
  }

  return result;
}


function solveOneStep(num1: number, sign: string, num2: number): number {
  if(sign === '+'){
    return num1+num2;
  }
  else if(sign === '*'){
    return num1*num2;
  }
  else{
    console.error("verkeerde symbool!");
    return -1;
  }
}


advent();