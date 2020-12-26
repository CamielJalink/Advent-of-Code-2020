"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var game_1 = require("./game");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var startingGameState = stringInput.split("").map(function (num) { return Number(num); });
    var game = new game_1.Game(startingGameState);
}
advent();
