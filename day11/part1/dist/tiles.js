"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTiles = exports.Tile = void 0;
var Tile = /** @class */ (function () {
    function Tile(x, y, state) {
        this.nextState = ".";
        this.neighbors = [];
        this.x = x;
        this.y = y;
        this.state = state;
    }
    Tile.prototype.countFilledNeighborSeats = function () {
        var numFilledNeighbors = 0;
        this.neighbors.forEach(function (neighbor) {
            if (neighbor.state === '#') {
                numFilledNeighbors++;
            }
        });
        return numFilledNeighbors;
    };
    return Tile;
}());
exports.Tile = Tile;
function createTiles(input) {
    var tiles = [];
    for (var y = 0; y < input.length; y++) {
        for (var x = 0; x < input[y].length; x++) {
            var tile = new Tile(x, y, input[y][x]);
            tiles.push(tile);
        }
    }
    tiles.forEach(function (tile) {
        var adjacentTiles = [];
        tiles.forEach(function (otherTile) {
            if (tile !== otherTile && isAdjacentTile(tile, otherTile)) {
                adjacentTiles.push(otherTile);
            }
        });
        tile.neighbors = adjacentTiles;
    });
    return tiles;
}
exports.createTiles = createTiles;
function isAdjacentTile(tile1, tile2) {
    if (Math.abs(tile1.x - tile2.x) < 2 && Math.abs(tile1.y - tile2.y) < 2) {
        return true;
    }
    return false;
}
