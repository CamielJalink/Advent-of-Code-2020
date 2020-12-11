"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var tiles_1 = require("./tiles");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    var tiles = tiles_1.createTiles(input);
    findFilledSeats(tiles);
}
function findFilledSeats(tiles) {
    var turns = 0;
    var stillChanging = true;
    var _loop_1 = function () {
        tiles.forEach(function (tile) {
            if (tile.state === 'L' && tile.countFilledNeighborSeats() === 0) {
                tile.nextState = '#';
            }
            else if (tile.state === '#' && tile.countFilledNeighborSeats() > 3) {
                tile.nextState = 'L';
            }
        });
        var somethingChanged = false;
        tiles.forEach(function (tile) {
            if (tile.state !== tile.nextState) {
                tile.state = tile.nextState;
                somethingChanged = true;
            }
        });
        if (!somethingChanged) {
            stillChanging = false;
        }
        turns++;
    };
    while (stillChanging) {
        _loop_1();
    }
    countTakenChairs(tiles);
}
function countTakenChairs(tiles) {
    var chairsTaken = 0;
    tiles.forEach(function (tile) {
        if (tile.state === '#') {
            chairsTaken++;
        }
    });
    console.log(chairsTaken);
}
advent();
