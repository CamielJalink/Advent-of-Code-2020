import { readFileSync } from "fs";
import { createTiles, Tile } from "./tiles";


function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  const tiles: Tile[] = createTiles(input);
  findFilledSeats(tiles);
  findFilledSeatsPart2(tiles);
}


function findFilledSeats(tiles: Tile[]){
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
  }

  countTakenChairs(tiles);
}


function findFilledSeatsPart2(tiles: Tile[]) {
  let stillChanging: boolean = true;

  while (stillChanging) {

    tiles.forEach((tile: Tile) => {
      if (tile.state === 'L' && tile.countFilledDirectionSeats() === 0) {
        tile.nextState = '#';
      }
      else if (tile.state === '#' && tile.countFilledDirectionSeats() > 4) {
        tile.nextState = 'L';
      }
      else{
        tile.nextState = tile.state;
      }
    })

    // drawTiles(tiles);

    let somethingChanged: boolean = false;
    tiles.forEach((tile: Tile) => {
      if (tile.state !== tile.nextState) {
        tile.state = tile.nextState;
        somethingChanged = true;
      }
    })

    if (!somethingChanged) {
      stillChanging = false;
    }
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


function drawTiles(tiles: Tile[]){
  const grid: string[] = [];
  tiles.forEach((tile: Tile) => {
    if(grid[tile.y] === undefined){
      grid[tile.y] = tile.state;
    } else{
      grid[tile.y] += tile.state;
    }
  })

  grid.forEach((row: string) => {
    console.log(row);
  })
}

advent();