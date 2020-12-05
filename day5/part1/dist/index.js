"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    findHighestSeatId(input);
}
function findHighestSeatId(boardingPasses) {
    var maxSeatId = 0;
    boardingPasses.forEach(function (boardingPass) {
        var rowCode = boardingPass.substring(0, 7);
        var seatCode = boardingPass.substring(7, 10);
        var rowNumber = helpers_1.findNumber(rowCode);
        var seatNumber = helpers_1.findNumber(seatCode);
        var seatId = rowNumber * 8 + seatNumber;
        if (seatId > maxSeatId) {
            maxSeatId = seatId;
        }
    });
    console.log("Highest Seat Id is ", maxSeatId);
}
advent();
