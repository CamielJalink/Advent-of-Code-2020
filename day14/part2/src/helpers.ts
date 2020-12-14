export function applyMaskToDecimal(currentMask: string, decimalValue: number){
  let binaryValue = decimalValue.toString(2);

  let num0sNeeded = 36 - binaryValue.length;
  for(let i = 0; i < num0sNeeded; i++){
    binaryValue = '0' + binaryValue;
  }

  binaryValue = applyMask(binaryValue, currentMask);
  return parseInt(binaryValue, 2);
}


function applyMask(binaryValue: string, mask: string){
  let maskedValue: string = '';

  for(let i = 0; i < mask.length; i++){
    if(mask[i] === 'X'){ // If we find an X, the value stays the same
      maskedValue = maskedValue + binaryValue[i];
    }
    else if(mask[i] === '1'){
      maskedValue = maskedValue + '1';
    }
    else if(mask[i] === '0'){
      maskedValue = maskedValue + '0';
    }
  }

  return maskedValue;
}