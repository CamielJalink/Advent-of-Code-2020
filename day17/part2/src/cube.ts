export class Cube{
  neighbors: Cube[] = [];
  x: number;
  y: number;
  z: number;
  state: string;
  nextState: string = '';

  constructor(x: number, y: number, z:number, state: string){
    this.x = x;
    this.y = y;
    this.z = z;
    this.state = state;
  }

  cycleState(): void{
    let activeNeighbors: number = 0;

    this.neighbors.forEach((neighbor: Cube) => {
      if (neighbor.state === '#') {
        activeNeighbors++;
      }
    })

    if(this.state === '#') {
      if(activeNeighbors < 2 || activeNeighbors > 3){
        this.nextState = '.';
      } else{
        this.nextState = '#';
      }
    }
    else{
      if(activeNeighbors === 3){
        this.nextState = '#';
      } else{
        this.nextState = '.';
      }
    }
  }
}


export class Map {
  knownMap: Cube[] = [];

  constructor(input: string[]) {
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        this.knownMap.push(new Cube(x, y, 0, input[y][x]));
      }
    }
    this.populateNeededNeighbors();
  }


  // Find the neighbor cube with these coordinates
  findCube(x: number, y: number, z: number): Cube {
    let neighborCube: Cube = new Cube(x, y, z, '.');

    for(let i = 0; i < this.knownMap.length; i++){
      const cube = this.knownMap[i];
      if (cube.x === x && cube.y === y && cube.z === z) {
        neighborCube = cube;
        break;
      }
    }
    return neighborCube;
  }


  // All our cubes are going to need to check their neighbors. If those neighbors don't exist,
  // create them, both in our knownMap as well as in their neighbors array.
  populateNeededNeighbors(): void{
    const currentlyKnownMap: Cube[] = [];
    this.knownMap.forEach((cube: Cube) => {
      currentlyKnownMap.push(cube);
    })

    currentlyKnownMap.forEach((cube: Cube) => {
      if(cube.neighbors.length !== 26){

        for(let x = cube.x - 1; x <= cube.x + 1; x++){
          for(let y = cube.y - 1; y <= cube.y + 1; y++){
            for (let z = cube.z - 1; z <= cube.z + 1; z++){
              if(!(x === cube.x && y === cube.y && z === cube.z)){ // you can't be your own neighbor don't be silly
                const neighbor = this.findCube(x, y, z);
                cube.neighbors.push(neighbor);

                if(!this.knownMap.includes(neighbor)){
                  this.knownMap.push(neighbor);
                }
              }
            }
          }
        }
      }
    })
  }


  cycle(): void{
    this.populateNeededNeighbors();

    this.knownMap.forEach((cube: Cube) => {
      cube.cycleState();
    })
    this.knownMap.forEach((cube: Cube) => {
      cube.state = cube.nextState;
    })
  }


  countActive(): number{
    let numActiveCubes: number = 0;
    this.knownMap.forEach((cube: Cube) => {
      if(cube.state === '#'){
        numActiveCubes++;
      }
    })
    return numActiveCubes;
  }
}