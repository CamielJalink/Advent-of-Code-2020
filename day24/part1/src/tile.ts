export class Tile{
  color: string = "white";
  name: string;
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
  }
}