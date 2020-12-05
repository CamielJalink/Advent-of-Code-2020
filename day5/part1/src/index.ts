import { readFileSync } from "fs";
import { findNumber } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  findHighestSeatId(input);
}


function findHighestSeatId(boardingPasses: string[]){
  let maxSeatId = 0;

  boardingPasses.forEach((boardingPass: string) => {
    const rowCode: string = boardingPass.substring(0, 7);
    const seatCode: string = boardingPass.substring(7, 10);

    const rowNumber: number = findNumber(rowCode);
    const seatNumber: number = findNumber(seatCode);

    const seatId = rowNumber * 8 + seatNumber;
    if(seatId > maxSeatId){
      maxSeatId = seatId;
    }
  })

  console.log("Highest Seat Id is ", maxSeatId);
}

advent();