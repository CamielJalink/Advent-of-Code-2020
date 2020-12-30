import { Tile } from "./tile";

export class Floor{
  tiles: Map<string, Tile> = new Map();
  centerTile: Tile;
  currentTile: Tile;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(){
    this.centerTile = new Tile(0, 0)
    this.tiles.set(this.centerTile.name, this.centerTile);
    this.currentTile = this.centerTile;
    this.checkOrCreateNeighbors();
  }


  flipAllTiles(directions: string[]): void{
    directions.forEach((direction: string) => {
      this.currentTile = this.centerTile;
      this.followDirection(direction);
      if(this.currentTile.color === "white"){
        this.currentTile.color = "black";
      } else{
        this.currentTile.color = "white";
      }
    })
  }


  followDirection(direction: string): void {

    // When the direction is all followed up, the currentTile will also be the target Tile.
    while(direction.length > 0){

      if(direction[0] === 'e'){
        if(this.currentTile.eTile){
          this.currentTile = this.currentTile.eTile;
        } else{
          console.error("trying to update to non-existing eTile");
        }
        direction = direction.substring(1);
      }
      else if(direction[0] === 'w'){
        if(this.currentTile.wTile){
          this.currentTile = this.currentTile.wTile;
        } else {
          console.error("trying to update to non-existing wTile");
        }
        direction = direction.substring(1);
      }      
      else if(direction[0] === 'n' && direction[1] === 'e'){
        if (this.currentTile.neTile) {
          this.currentTile = this.currentTile.neTile;
        } else {
          console.error("trying to update to non-existing neTile");
        }
        direction = direction.substring(2);
      }
      else if (direction[0] === 'n' && direction[1] === 'w') {
        if (this.currentTile.nwTile) {
          this.currentTile = this.currentTile.nwTile;
        } else {
          console.error("trying to update to non-existing nwTile");
        }
        direction = direction.substring(2);
      }
      else if (direction[0] === 's' && direction[1] === 'e') {
        if (this.currentTile.seTile) {
          this.currentTile = this.currentTile.seTile;
        } else {
          console.error("trying to update to non-existing seTile");
        }
        direction = direction.substring(2);
      }
      else if (direction[0] === 's' && direction[1] === 'w') {
        if (this.currentTile.swTile) {
          this.currentTile = this.currentTile.swTile;
        } else {
          console.error("trying to update to non-existing swTile");
        }
        direction = direction.substring(2);
      }

      this.checkOrCreateNeighbors();
    }
  }


  checkOrCreateNeighbors(): void{
    const x = this.currentTile.x;
    const y = this.currentTile.y;

    if(this.currentTile.neTile === undefined){
      const neName: string = (x + 1).toString() + "," + (y + 1).toString();
      if (this.tiles.has(neName)) {
        this.currentTile.neTile = this.tiles.get(neName);
      } else {
        this.currentTile.neTile = new Tile(x + 1, y + 1);
        this.tiles.set(neName, this.currentTile.neTile);
      }
    }


    if (this.currentTile.eTile === undefined) {
      const eName: string  = (x + 2).toString() + "," + y.toString();
      if (this.tiles.has(eName)) {
        this.currentTile.eTile = this.tiles.get(eName);
      } else {
        this.currentTile.eTile = new Tile(x + 2, y);
        this.tiles.set(eName, this.currentTile.eTile);
      }
    }


    if (this.currentTile.seTile === undefined) {
      const seName: string = (x + 1).toString() + "," + (y - 1).toString();
      if (this.tiles.has(seName)) {
        this.currentTile.seTile = this.tiles.get(seName);
      } else {
        this.currentTile.seTile = new Tile(x + 1, y - 1);
        this.tiles.set(seName, this.currentTile.seTile);
      }
    }


    if (this.currentTile.swTile === undefined) {
      const swName: string = (x - 1).toString() + "," + (y - 1).toString();
      if (this.tiles.has(swName)) {
        this.currentTile.swTile = this.tiles.get(swName);
      } else {
        this.currentTile.swTile = new Tile(x - 1, y - 1);
        this.tiles.set(swName, this.currentTile.swTile);
      }
    }


    if (this.currentTile.wTile === undefined) {
      const wName: string  = (x - 2).toString() + "," + y.toString();
      if (this.tiles.has(wName)) {
        this.currentTile.wTile = this.tiles.get(wName);
      } else {
        this.currentTile.wTile = new Tile(x - 2, y);
        this.tiles.set(wName, this.currentTile.wTile);
      }
    }


    if (this.currentTile.nwTile === undefined) {
      const nwName: string = (x - 1).toString() + "," + (y + 1).toString();
      if (this.tiles.has(nwName)) {
        this.currentTile.nwTile = this.tiles.get(nwName);
      } else {
        this.currentTile.nwTile = new Tile(x - 1, y + 1);
        this.tiles.set(nwName, this.currentTile.nwTile);
      }
    }
  }


  countAllColored(): number{
    let numBlackTiles: number = 0;
    this.tiles.forEach((tile: Tile) => {
      if(tile.color === 'black'){
        numBlackTiles++;
      }
    })    
    return numBlackTiles;
  }


  checkBlackTiles100Days(): void{
    for (let i = 0; i < 100; i++) {

      const tilesArray: Tile[] = [];
      this.tiles.forEach((tile: Tile) => {
        tilesArray.push(tile);
      })

      tilesArray.forEach((tile: Tile) => {
        this.expandTileRange(tile);
      })

      this.tiles.forEach((tile: Tile) => {
        tile.determineIfShouldFlip();
      })

      this.tiles.forEach((tile: Tile) => {
        if(tile.shouldFlip){
          if(tile.color === "white"){
            tile.color = "black";
          }
          else if (tile.color === "black"){
            tile.color = "white";
          }
          else{
            console.log("---------------")
          }
        }
        tile.shouldFlip = false;
      })

      const day: number = i + 1;
      console.log("Day " + day + ": " + this.countAllColored());
    }
  }


  // By setting the currenttile to be any input tile, 
  // we can use the checkorcreateneighbors method for part2
  expandTileRange(tile: Tile): void{
    this.currentTile = tile;
    this.checkOrCreateNeighbors();
  }
}