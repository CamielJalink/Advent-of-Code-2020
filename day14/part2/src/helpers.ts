export function applyMaskToMemory(currentMask: string, memoryValue: number){
  let binaryValue = memoryValue.toString(2);

  let num0sNeeded = 36 - binaryValue.length;
  for(let i = 0; i < num0sNeeded; i++){
    binaryValue = '0' + binaryValue;
  }

  let allBinaryMemoryTargets: string[] = applyMask(binaryValue, currentMask);
  let allDecimalMemoryTargets = allBinaryMemoryTargets.map((binNum: string) => {
    return parseInt(binNum, 2);
  })

  return allDecimalMemoryTargets;
}


function applyMask(binaryValue: string, mask: string){
  let maskedValue: string = '';
  let numXs: number = 0;

  for(let i = 0; i < mask.length; i++){
    if(mask[i] === 'X'){
      maskedValue = maskedValue + 'X';
      numXs++;
    }
    else if(mask[i] === '1'){
      maskedValue = maskedValue + '1';
    }
    else if(mask[i] === '0'){
      maskedValue = maskedValue + binaryValue[i];
    }
  }

  let allCombinations: string[] = getAllCombinations(maskedValue, numXs);
  return allCombinations;
}


function getAllCombinations(maskedValue: string, numXs: number){
  let numCombinations: number = 2 ** numXs;

  let decimalNumbers: number[] = []
  for(let i = 0; i < numCombinations; i++){
    decimalNumbers.push(i);
  }
  let longestBinaryLength: number = decimalNumbers[decimalNumbers.length - 1].toString(2).length;

  let binaryNumbers = decimalNumbers.map((decNum: number) => {
    let binNum = decNum.toString(2);
    for(let i = 0; i < longestBinaryLength; i++){
      if(binNum.length < longestBinaryLength){
        binNum = '0' + binNum;
      }
    }
    return binNum;
  })

  let allCombinations: string[] = [];
  for(let i = 0; i < binaryNumbers.length; i++){
    let binaryArray: string[] = binaryNumbers[i].split("");
    
    let newCombination: string = '';
    for(let j = 0; j < maskedValue.length; j++){
      if(maskedValue[j] === 'X'){
        let nextBin = binaryArray.shift();
        newCombination = newCombination + nextBin;
      } else{
        newCombination = newCombination + maskedValue[j];
      }
      newCombination[j]
    }

    allCombinations.push(newCombination);
  }

  return allCombinations;
}