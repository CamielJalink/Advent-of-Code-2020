import { readFileSync } from "fs";
import { findNumber, findFreeSeats, findMySeatId } from "./helpers";


function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  findMySeat(input);
}


function findMySeat(boardingPasses: string[]){
  let maxSeatId = 0;
  const seatsTaken: string[][] = [];

  for(let i = 0; i < 128; i++){
    seatsTaken.push([]); // add empty rows
  }

  boardingPasses.forEach((boardingPass: string) => {
    const rowCode: string = boardingPass.substring(0, 7);
    const seatCode: string = boardingPass.substring(7, 10);
    const rowNumber: number = findNumber(rowCode);
    const seatNumber: number = findNumber(seatCode);

    seatsTaken[rowNumber][seatNumber] = 'x'; // Mark all taken seats with an x

    const seatId = rowNumber * 8 + seatNumber;
    if(seatId > maxSeatId){
      maxSeatId = seatId;
    }
  })

  console.log("Highest Seat Id is:", maxSeatId);
  const freeSeats: number[] = findFreeSeats(seatsTaken);
  console.log("My seat Id is:", findMySeatId(freeSeats));
}


advent();