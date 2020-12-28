"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var floor_1 = require("./floor");
// import { Tile } from "./tile";
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    var floor = new floor_1.Floor();
    floor.flipAllTiles(input);
    console.log("Part 1 answer: " + floor.countAllColored());
    floor.checkBlackTiles100Days();
}
advent();
// Begin bij tile 0,0 en maak neighbors voor hem.
// Parse de volgende opdracht. 
// als bv NE, maak dan van zijn NE neighbor de nieuwe active neighbor,
// en roep voor hem een create neighbors aan. 
// 
// Een map hebben met als key de coordinates in een string oid.
// 
