"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    parseInstructions(input);
}
// mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
// mem[8] = 11
// mem[7] = 101
// mem[8] = 0
function parseInstructions(input) {
    var memory = [];
    var currentMask;
    input.forEach(function (line) {
        var lineProps = line.split(" = ");
        if (lineProps[0] === 'mask') {
            currentMask = lineProps[1];
        }
        else {
            var targetMemory = Number(lineProps[0].match(/\d+/)); // Find the memory slot that we want to overwrite
            var decimalValue = Number(lineProps[1]);
            memory[targetMemory] = helpers_1.applyMaskToDecimal(currentMask, decimalValue);
        }
    });
    var sumInMemory = memory.reduce(function (acc, num) { return acc + num; });
    console.log("All values in memory put together are: ", sumInMemory);
}
advent();
