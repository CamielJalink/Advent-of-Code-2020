export interface SpokenNumber {
  num: number,
  turnSpokenLast: number
}


// Heb ik er iets aan als ik alleen maar kan vragen 'besta ik al?' aan een set van getallen?

// Ja, denk ik wel. 


// De methode hieronder haal ik spokenTurn en currentTurn door elkaar.
export function addToSpokenBefore(spokenBefore: SpokenNumber[], num: number, spokenTurn: number){
  let numIsSpokenBefore: boolean = false;
  let numNextToSpeak: number = 0;

  // If num has already been spoken before, update that spokenNumber.
  spokenBefore.forEach((spokenNumber: SpokenNumber) => {
    if(spokenNumber.num === num){
      numNextToSpeak = spokenTurn - spokenNumber.turnSpokenLast;
      spokenNumber.turnSpokenLast = spokenTurn;
      numIsSpokenBefore = true;
    }
  })

  // else, add num as a new spokenNumber
  if(!numIsSpokenBefore){
    spokenBefore.push({
      num: num,
      turnSpokenLast: spokenTurn
    })
  }

  return numNextToSpeak;
}