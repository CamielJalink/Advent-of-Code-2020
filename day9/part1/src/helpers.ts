export function updatePreamble(preamble: number[]){
  let nextPointer = preamble[preamble.length-1]+1;
  preamble.push(nextPointer);
  preamble.shift();
  return preamble;
}


export function isValidNumber(input: number[], preamble: number[], target: number){
  let preambleNumbers: number[] = preamble.map((pointer) => {
    return input[pointer];
  })

  let targetIsValid: boolean = false;
  preambleNumbers.forEach((preambleNum: number) => {
    preambleNumbers.forEach((preambleNum2: number) => {
      if(preambleNum + preambleNum2 === target){
        targetIsValid = true; 
      }
    })
  })

  return targetIsValid;
}