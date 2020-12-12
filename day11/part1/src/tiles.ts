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


  countFilledDirectionSeats(){
    let numFilledDirectionSeats: number = 0;
    let possibleDirections: number[][] = [[1, 0], [-1, 0], [0, -1], [0, 1], [1, 1], [-1, 1], [1, -1], [-1, -1]]

    possibleDirections.forEach((direction: number[]) => {
      let numChairsInDirection: number = this.checkDirection(direction[0], direction[1]);
      numFilledDirectionSeats += numChairsInDirection;
    })

    return numFilledDirectionSeats;
  }


  // Check the neighbor in that direction. If he/she exists and isn't filled, ask him/her to do the same
  checkDirection(xDir: number, yDir: number): number{
    let directionNeighbor: Tile;

    //find the neighbor in that direction.
    this.neighbors.forEach((neighbor: Tile) => {
      if(this.x + xDir === neighbor.x && this.y + yDir === neighbor.y){
        directionNeighbor = neighbor;
      }
    })

    // If there is no neighbor in that direction, return 0
    if(directionNeighbor! === undefined || directionNeighbor.state === 'L'){
      return 0;
    }
    else if(directionNeighbor.state === '#'){
      return 1;
    }
    else{ // If the neighbor exists, but is a '.'
      return directionNeighbor.checkDirection(xDir, yDir);
    }
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