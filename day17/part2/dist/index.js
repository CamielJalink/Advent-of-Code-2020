"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var cube_1 = require("./cube");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    var map = new cube_1.Map(input);
    activeAfter6Cycles(map);
}
function activeAfter6Cycles(map) {
    for (var i = 0; i < 6; i++) {
        map.cycle();
        console.log('finished turn ' + i);
    }
    console.log(map.countActive());
}
advent();
