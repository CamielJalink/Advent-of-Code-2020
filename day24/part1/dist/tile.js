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
    }
    return Tile;
}());
exports.Tile = Tile;
