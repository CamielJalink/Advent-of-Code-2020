export function addToSpokenBefore(spokenBefore: Map<number,number>, num: number, spokenTurn: number){
  let numNextToSpeak: number = 0;

  if(spokenBefore.has(num)){
    numNextToSpeak = spokenTurn - spokenBefore.get(num)!;
  }
  
  spokenBefore.set(num, spokenTurn);
  return numNextToSpeak;
}