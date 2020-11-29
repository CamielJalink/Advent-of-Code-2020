"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
// promisify the readFile node method to read our txt input files.
// let readInput = readFileSync;
function advent() {
    var input = fs_1.readFileSync("input.txt", "utf-8");
    console.log(input);
    // return readInput("input.txt", "utf8").then((input: string) => {
    //   let wireArray: string[] = input.split("\n");
    //   findClosestCrossing(wire1, wire2);
    // })
}
advent();
