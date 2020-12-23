"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var stringHands = stringInput.split("\r\n\r\n");
    var game = new helpers_1.Game(stringHands);
    var winningScore = game.playUntilWinner();
    console.log(winningScore);
}
advent();
