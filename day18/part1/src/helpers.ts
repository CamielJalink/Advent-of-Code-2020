export function parseExpressions(expressions: string[]){
  let parsedExpressions: string[] = [];
  const regex = /\S/g;

  expressions.forEach((expression: string) => {
    const expressionArray = expression.match(regex);
    let parsedExpression: string = '';
    if(expressionArray){
      parsedExpression = expressionArray.reduce((accString, char) => accString + char);
    }
    parsedExpressions.push(parsedExpression);
  })
  
  return parsedExpressions;
}


export function findClosingBracket(expression: string, openingBracketI: number): number{
  let numInnerBrackets: number = 0;
  let closingBracketI: number = openingBracketI;

  for(let i = openingBracketI + 1; i < expression.length; i++){
    if(expression[i] === ')' && numInnerBrackets === 0){
      closingBracketI = i;
      break;
    }
    else if(expression[i] === ')'){
      numInnerBrackets--;
    }
    else if(expression[i] === '('){
      numInnerBrackets++;
    }
  }

  return closingBracketI;
}


export function findFullNumber(expression: string, numStartingI: number): number{
  let fullNumber: string = '';
  for(let i = numStartingI; i < expression.length; i++){
    if(isNaN(Number(expression[i])) === false){
      fullNumber += expression[i];
    } else{
      break;
    }
  }
  return Number(fullNumber);
}