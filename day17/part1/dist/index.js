"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var cube_1 = require("./cube");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    var map = [];
    cube_1.createInitialCubes(input, map);
    console.log(map);
}
advent();
