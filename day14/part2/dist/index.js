"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    parseInstructions(input);
}
function parseInstructions(input) {
    var memory = [];
    var currentMask;
    input.forEach(function (line) {
        var lineProps = line.split(" = ");
        if (lineProps[0] === 'mask') {
            currentMask = lineProps[1];
        }
        else {
            var targetMemory = Number(lineProps[0].match(/\d+/));
            var decimalValue_1 = Number(lineProps[1]);
            var memoryTargets = helpers_1.applyMaskToMemory(currentMask, targetMemory);
            memoryTargets.forEach(function (num) {
                var numIndexExists = false;
                for (var i = 0; i < memory.length; i++) {
                    if (memory[i].index === num) {
                        memory[i].value = decimalValue_1;
                        numIndexExists = true;
                        break;
                    }
                }
                if (!numIndexExists) {
                    memory.push({ index: num, value: decimalValue_1 });
                }
            });
        }
    });
    console.log(memory);
    var sumInMemory = 0;
    memory.forEach(function (memory) {
        sumInMemory += memory.value;
    });
    console.log("All values in memory put together are: ", sumInMemory);
}
advent();
