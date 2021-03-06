"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var game_1 = require("./game");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var stringHands = stringInput.split("\r\n\r\n");
    var player1StringInput = stringHands[0].split("\r\n");
    var player2StringInput = stringHands[1].split("\r\n");
    player1StringInput.shift();
    player2StringInput.shift();
    var player1Input = player1StringInput.map(function (stringCard) { return Number(stringCard); });
    var player2Input = player2StringInput.map(function (stringCard) { return Number(stringCard); });
    var game = new game_1.Game(player1Input, player2Input);
    var winningPlayer = game.playUntilWinner();
    if (winningPlayer === "Player 1") {
        console.log("Player 1 won the game with ", game.player1.calculateScore(), " points");
    }
    else if (winningPlayer === "Player 2") {
        console.log("Player 2 won the game with ", game.player2.calculateScore(), " points");
    }
    else {
        console.log("ERROR FOR ", winningPlayer);
    }
}
advent();
