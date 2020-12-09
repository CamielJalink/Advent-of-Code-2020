"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n").map(function (stringNum) {
        return Number(stringNum);
    });
    findFirstXmasNumber(input, 25);
}
advent();
function findFirstXmasNumber(input, preambleLength) {
    var preamble = [];
    for (var i = 0; i < preambleLength; i++) {
        preamble[i] = i;
    }
    for (var i = preamble.length; i < input.length; i++) {
        var nextNum = input[i];
        if (!helpers_1.isValidNumber(input, preamble, nextNum)) {
            console.log("Invalid number found: " + nextNum);
            break;
        }
        helpers_1.updatePreamble(preamble);
    }
}
