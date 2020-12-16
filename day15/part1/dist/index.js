"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split(",").map(function (stringNum) { return Number(stringNum); });
    playGame(input);
}
function playGame(gameNumbers) {
    var spokenBefore = new Map();
    for (var i = 0; i < gameNumbers.length - 1; i++) { // This '-1' is a real purrty magic number...
        spokenBefore.set(gameNumbers[i], i + 1);
    }
    for (var turn = gameNumbers.length; turn < 30000000; turn++) { // We don't start in turn 1, since we first speak start numbers
        var lastSpoken = gameNumbers[gameNumbers.length - 1];
        var nextNumber = helpers_1.addToSpokenBefore(spokenBefore, lastSpoken, turn);
        gameNumbers.push(nextNumber);
    }
    console.log(gameNumbers[gameNumbers.length - 1]);
}
advent();
