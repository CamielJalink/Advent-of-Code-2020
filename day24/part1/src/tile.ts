export class Tile{
  color: string = "white";
  name: string;
  shouldFlip: boolean;
  x: number;
  y: number;
  neTile: Tile | undefined = undefined;
  eTile: Tile | undefined = undefined;
  seTile: Tile | undefined = undefined;
  swTile: Tile | undefined = undefined;
  wTile: Tile | undefined = undefined;
  nwTile: Tile | undefined = undefined;

  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
    this.name = x.toString + "," + y.toString;
    this.shouldFlip = false;
  }


  determineIfShouldFlip(): void{
    let blackNeighborTiles: number = 0;

    if(this.neTile && this.neTile.color === "black"){
      blackNeighborTiles++;
    }
    if (this.eTile && this.eTile.color === "black") {
      blackNeighborTiles++;
    }
    if (this.seTile && this.seTile.color === "black") {
      blackNeighborTiles++;
    }
    if (this.swTile && this.swTile.color === "black") {
      blackNeighborTiles++;
    }
    if (this.wTile && this.wTile.color === "black") {
      blackNeighborTiles++;
    }
    if (this.nwTile && this.nwTile.color === "black") {
      blackNeighborTiles++;
    }

    if(this.color === "black" && (blackNeighborTiles === 0 || blackNeighborTiles > 2)){
      this.shouldFlip = true;
    }
    else if (this.color === "white" && blackNeighborTiles === 2){
      this.shouldFlip = true;
    }
  }
}