export function findNumber(code: string){
  let lowerBound: number = 0;
  let upperBound: number = 2 ** code.length - 1; // 8 for seats, 128 for rows.

  for(let i = 0; i < code.length; i++){
    let relevantArea = upperBound - lowerBound + 1;
    if(code[i] === 'L' || code[i] === 'F'){ // F and L are the lower halves
      upperBound = upperBound - (relevantArea / 2);
    } else{
      lowerBound = lowerBound + (relevantArea / 2);
    }
  }

  return lowerBound; // lowerbound and upperbound are now the same number
}