"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
var Tile = /** @class */ (function () {
    function Tile(x, y) {
        this.color = "white";
        this.neTile = undefined;
        this.eTile = undefined;
        this.seTile = undefined;
        this.swTile = undefined;
        this.wTile = undefined;
        this.nwTile = undefined;
        this.x = x;
        this.y = y;
        this.name = x.toString + "," + y.toString;
        this.shouldFlip = false;
    }
    Tile.prototype.determineIfShouldFlip = function () {
        var blackNeighborTiles = 0;
        if (this.neTile && this.neTile.color === "black") {
            blackNeighborTiles++;
        }
        if (this.eTile && this.eTile.color === "black") {
            blackNeighborTiles++;
        }
        if (this.seTile && this.seTile.color === "black") {
            blackNeighborTiles++;
        }
        if (this.swTile && this.swTile.color === "black") {
            blackNeighborTiles++;
        }
        if (this.wTile && this.wTile.color === "black") {
            blackNeighborTiles++;
        }
        if (this.nwTile && this.nwTile.color === "black") {
            blackNeighborTiles++;
        }
        if (this.color === "black" && (blackNeighborTiles === 0 || blackNeighborTiles > 2)) {
            this.shouldFlip = true;
        }
        else if (this.color === "white" && blackNeighborTiles === 2) {
            this.shouldFlip = true;
        }
    };
    return Tile;
}());
exports.Tile = Tile;
