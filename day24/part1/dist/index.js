"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var floor_1 = require("./floor");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    var floor = new floor_1.Floor();
    floor.flipAllTiles(input);
    console.log("Part 1 answer: " + floor.countAllColored());
    floor.checkBlackTiles100Days();
}
advent();
