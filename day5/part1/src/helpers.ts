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


export function findFreeSeats(seatsTaken: string[][]) {
  let freeSeats = [];

  for (let row = 0; row < 128; row++) {
    for (let seat = 0; seat < 8; seat++) {
      if (seatsTaken[row][seat] !== 'x') {
        freeSeats.push(row * 8 + seat);
      }
    }
  }

  return freeSeats;
}


export function findMySeatId(freeSeats: number[]){
  let mySeatId: number = 0;

  // sort available seats based on seatId
  freeSeats.sort((seatIdA, seatIdB) => {
    if(seatIdA < seatIdB){
      return -1;
    } else{
      return 1;
    }
  });


  // Since we know we are not in the back on in the front of the plane, 
  // we know that the seats next to us are taken and therefor NOT in the freeSeats array.
  for(let i = 1; i < freeSeats.length -1; i++){
    let seat = freeSeats[i];
    let prevSeat = freeSeats[i-1];
    let nextSeat = freeSeats[i+1];

    // The seats next to ours would have an id of 1 greater or less than ours
    if(Math.abs(seat - prevSeat) !== 1 && Math.abs(seat - nextSeat) !== 1){
      mySeatId = seat;
    }
  }

  return mySeatId;
}