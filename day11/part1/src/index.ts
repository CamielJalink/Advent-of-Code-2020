import { readFileSync } from "fs";
import { createTiles, Tile } from "./tiles";


function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  let tiles: Tile[] = createTiles(input);
  findFilledSeats(tiles);
}


function findFilledSeats(tiles: Tile[]){
  let turns: number = 0;
  let stillChanging: boolean = true;

  while(stillChanging){
    
    tiles.forEach((tile: Tile) => {
      if(tile.state === 'L' && tile.countFilledNeighborSeats() === 0){
        tile.nextState = '#';
      }
      else if(tile.state === '#' && tile.countFilledNeighborSeats() > 3){
        tile.nextState = 'L';
      }
    })

    let somethingChanged: boolean = false;
    tiles.forEach((tile: Tile) => {
      if(tile.state !== tile.nextState){
        tile.state = tile.nextState;
        somethingChanged = true;
      }
    })

    if(!somethingChanged){
      stillChanging = false;
    }
    turns++;
  }

  countTakenChairs(tiles);
}


function countTakenChairs(tiles: Tile[]){
  let chairsTaken: number = 0;
  tiles.forEach((tile: Tile) => {
    if(tile.state === '#'){
      chairsTaken++;
    }
  })
  console.log(chairsTaken);
}


advent();