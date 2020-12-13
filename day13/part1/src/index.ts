import { readFileSync } from "fs";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  const currentTime = Number(input[0]);
  const stringBusses = input[1].split(",");

  let busses: number[] = [];
  for(let i = 0; i < stringBusses.length; i++){
    if(!isNaN(Number(stringBusses[i]))) { 
      busses.push(Number(stringBusses[i]))
    }
  }
  
  findEarliestBusDeparture(currentTime, busses);
}



function findEarliestBusDeparture(currentTime: number, busses: number[]){
  let nextBusDepartureInMinutes = findEarliestDeparture(currentTime, busses[0]);
  let nextBus: number = busses[0];

  busses.forEach((bus: number) => {
    let busNextDeparture = findEarliestDeparture(currentTime, bus);
    if(busNextDeparture < nextBusDepartureInMinutes){
      nextBusDepartureInMinutes = busNextDeparture;
      nextBus = bus;
    }
  })

  console.log(nextBus * nextBusDepartureInMinutes);
}



function findEarliestDeparture(currentTime: number, busTravelTime: number){
  let busIteration: number = 0;
  while(currentTime > busIteration){
    busIteration += busTravelTime;
  }
  return busIteration - currentTime;
}


advent();