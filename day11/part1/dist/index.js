"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var tiles_1 = require("./tiles");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    var tiles = tiles_1.createTiles(input);
    findFilledSeats(tiles);
    findFilledSeatsPart2(tiles);
}
function findFilledSeats(tiles) {
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
    };
    while (stillChanging) {
        _loop_1();
    }
    countTakenChairs(tiles);
}
function findFilledSeatsPart2(tiles) {
    var stillChanging = true;
    var _loop_2 = function () {
        tiles.forEach(function (tile) {
            if (tile.state === 'L' && tile.countFilledDirectionSeats() === 0) {
                tile.nextState = '#';
            }
            else if (tile.state === '#' && tile.countFilledDirectionSeats() > 4) {
                tile.nextState = 'L';
            }
            else {
                tile.nextState = tile.state;
            }
        });
        // drawTiles(tiles);
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
    };
    while (stillChanging) {
        _loop_2();
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
function drawTiles(tiles) {
    var grid = [];
    tiles.forEach(function (tile) {
        if (grid[tile.y] === undefined) {
            grid[tile.y] = tile.state;
        }
        else {
            grid[tile.y] += tile.state;
        }
    });
    grid.forEach(function (row) {
        console.log(row);
    });
}
advent();
