export class Tile{
  x: number;
  y: number;
  state: string;
  nextState: string = ".";
  neighbors: Tile[] = [];

  constructor(x: number, y: number, state: string){
    this.x = x;
    this.y = y;
    this.state = state;
  }

  countFilledNeighborSeats(){
    let numFilledNeighbors: number = 0;
    this.neighbors.forEach((neighbor: Tile) => {
      if(neighbor.state === '#'){
        numFilledNeighbors++;
      }
    })
    return numFilledNeighbors;
  }
}


export function createTiles(input: string[]){
  let tiles: Tile[] = [];

  for(let y = 0; y < input.length; y++){
    for(let x = 0; x < input[y].length; x++){
      let tile = new Tile(x, y, input[y][x]);
      tiles.push(tile);
    }
  }

  tiles.forEach((tile: Tile) => {
    let adjacentTiles: Tile[] = [];
    tiles.forEach((otherTile: Tile) => {
      if(tile !== otherTile && isAdjacentTile(tile, otherTile)){
        adjacentTiles.push(otherTile);
      }
    })
    tile.neighbors = adjacentTiles;
  })

  return tiles;
}


function isAdjacentTile(tile1: Tile, tile2: Tile){
  if(Math.abs(tile1.x - tile2.x) < 2 && Math.abs(tile1.y - tile2.y) < 2){
    return true;
  }
  return false;
}