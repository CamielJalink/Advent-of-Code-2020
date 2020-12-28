import { readFileSync } from "fs";
import { Floor } from "./floor";
// import { Tile } from "./tile";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  const floor: Floor = new Floor();
  floor.flipAllTiles(input);
  floor.countAllColored();
}

advent();



// Begin bij tile 0,0 en maak neighbors voor hem.
// Parse de volgende opdracht. 

// als bv NE, maak dan van zijn NE neighbor de nieuwe active neighbor,
// en roep voor hem een create neighbors aan. 
// 

// Een map hebben met als key de coordinates in een string oid.
// 