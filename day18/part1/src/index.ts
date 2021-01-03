import { readFileSync } from "fs";
import { parseExpressions, findClosingBracket, findFullNumber, createExpressionArray } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  const expressions: string[] = parseExpressions(input);
  let result: number = 0;
  expressions.forEach((expression: string) => {
    let expressionResult = solveExpression(expression);
    result += expressionResult;
  })
  console.log("Result of adding all numbers together is: ", result);
}


function solveExpression(expression: string): number{  
  let expressionArray: any[] = createExpressionArray(expression);

  if(isNaN(expressionArray[0])){
    expressionArray[0] = solveExpression(expressionArray[0]);
  }

  let additionSolved: any[] = [];

  while(expressionArray.length > 1){
    let elem1 = expressionArray[0]
    let sign  = expressionArray[1];
    let elem2 = expressionArray[2];

    if (isNaN(elem1)) {
      elem1 = solveExpression(elem1);
    }
    if(isNaN(elem2)){
      elem2 = solveExpression(elem2);
    }

    if(sign === '*'){
      additionSolved.push(elem1);
      additionSolved.push(sign);
      expressionArray.shift();
      expressionArray.shift();
    }
    else if(sign === '+'){
      let plusResult = solveOneStep(elem1, sign, elem2);
      expressionArray.shift();
      expressionArray.shift();
      expressionArray[0] = plusResult;
    }
  }
  additionSolved = [...additionSolved, ...expressionArray] // Add the final bits


  if (isNaN(additionSolved[0])) {
    additionSolved[0] = solveExpression(additionSolved[0]);
  }
  let result = additionSolved.shift();

  while(additionSolved.length > 1){

    let sign = additionSolved[0];
    let elem2 = additionSolved[1];

    if (isNaN(elem2)) {
      elem2 = solveExpression(elem2);
    }

    result = solveOneStep(result, sign, elem2);
    additionSolved.shift();
    additionSolved.shift();
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