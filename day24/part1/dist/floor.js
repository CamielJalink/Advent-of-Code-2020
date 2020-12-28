"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Floor = void 0;
var tile_1 = require("./tile");
var Floor = /** @class */ (function () {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function Floor() {
        this.tiles = new Map();
        this.centerTile = new tile_1.Tile(0, 0);
        this.tiles.set(this.centerTile.name, this.centerTile);
        this.currentTile = this.centerTile;
        this.checkOrCreateNeighbors();
    }
    Floor.prototype.flipAllTiles = function (directions) {
        var _this = this;
        directions.forEach(function (direction) {
            _this.currentTile = _this.centerTile;
            _this.followDirection(direction);
            if (_this.currentTile.color === "white") {
                _this.currentTile.color = "black";
            }
            else {
                _this.currentTile.color = "white";
            }
        });
    };
    Floor.prototype.followDirection = function (direction) {
        // When the direction is all followed up, the currentTile will also be the target Tile.
        while (direction.length > 0) {
            if (direction[0] === 'e') {
                if (this.currentTile.eTile) {
                    this.currentTile = this.currentTile.eTile;
                }
                else {
                    console.error("trying to update to non-existing eTile");
                }
                direction = direction.substring(1);
            }
            else if (direction[0] === 'w') {
                if (this.currentTile.wTile) {
                    this.currentTile = this.currentTile.wTile;
                }
                else {
                    console.error("trying to update to non-existing wTile");
                }
                direction = direction.substring(1);
            }
            else if (direction[0] === 'n' && direction[1] === 'e') {
                if (this.currentTile.neTile) {
                    this.currentTile = this.currentTile.neTile;
                }
                else {
                    console.error("trying to update to non-existing neTile");
                }
                direction = direction.substring(2);
            }
            else if (direction[0] === 'n' && direction[1] === 'w') {
                if (this.currentTile.nwTile) {
                    this.currentTile = this.currentTile.nwTile;
                }
                else {
                    console.error("trying to update to non-existing nwTile");
                }
                direction = direction.substring(2);
            }
            else if (direction[0] === 's' && direction[1] === 'e') {
                if (this.currentTile.seTile) {
                    this.currentTile = this.currentTile.seTile;
                }
                else {
                    console.error("trying to update to non-existing seTile");
                }
                direction = direction.substring(2);
            }
            else if (direction[0] === 's' && direction[1] === 'w') {
                if (this.currentTile.swTile) {
                    this.currentTile = this.currentTile.swTile;
                }
                else {
                    console.error("trying to update to non-existing swTile");
                }
                direction = direction.substring(2);
            }
            this.checkOrCreateNeighbors();
        }
    };
    Floor.prototype.checkOrCreateNeighbors = function () {
        var x = this.currentTile.x;
        var y = this.currentTile.y;
        if (this.currentTile.neTile === undefined) {
            var neName = (x + 1).toString() + "," + (y + 1).toString();
            if (this.tiles.has(neName)) {
                this.currentTile.neTile = this.tiles.get(neName);
            }
            else {
                this.currentTile.neTile = new tile_1.Tile(x + 1, y + 1);
                this.tiles.set(neName, this.currentTile.neTile);
            }
        }
        if (this.currentTile.eTile === undefined) {
            var eName = (x + 2).toString() + "," + y.toString();
            if (this.tiles.has(eName)) {
                this.currentTile.eTile = this.tiles.get(eName);
            }
            else {
                this.currentTile.eTile = new tile_1.Tile(x + 2, y);
                this.tiles.set(eName, this.currentTile.eTile);
            }
        }
        if (this.currentTile.seTile === undefined) {
            var seName = (x + 1).toString() + "," + (y - 1).toString();
            if (this.tiles.has(seName)) {
                this.currentTile.seTile = this.tiles.get(seName);
            }
            else {
                this.currentTile.seTile = new tile_1.Tile(x + 1, y - 1);
                this.tiles.set(seName, this.currentTile.seTile);
            }
        }
        if (this.currentTile.swTile === undefined) {
            var swName = (x - 1).toString() + "," + (y - 1).toString();
            if (this.tiles.has(swName)) {
                this.currentTile.swTile = this.tiles.get(swName);
            }
            else {
                this.currentTile.swTile = new tile_1.Tile(x - 1, y - 1);
                this.tiles.set(swName, this.currentTile.swTile);
            }
        }
        if (this.currentTile.wTile === undefined) {
            var wName = (x - 2).toString() + "," + y.toString();
            if (this.tiles.has(wName)) {
                this.currentTile.wTile = this.tiles.get(wName);
            }
            else {
                this.currentTile.wTile = new tile_1.Tile(x - 2, y);
                this.tiles.set(wName, this.currentTile.wTile);
            }
        }
        if (this.currentTile.nwTile === undefined) {
            var nwName = (x - 1).toString() + "," + (y + 1).toString();
            if (this.tiles.has(nwName)) {
                this.currentTile.nwTile = this.tiles.get(nwName);
            }
            else {
                this.currentTile.nwTile = new tile_1.Tile(x - 1, y + 1);
                this.tiles.set(nwName, this.currentTile.nwTile);
            }
        }
    };
    Floor.prototype.countAllColored = function () {
        var numBlackTiles = 0;
        this.tiles.forEach(function (tile) {
            if (tile.color === 'black') {
                numBlackTiles++;
            }
        });
        console.log("I count this many black tiles: ", numBlackTiles);
        // this.tiles.forEach((tile: Tile) => {
        //   console.log("---------------------")
        //   if(tile.color === "black"){
        //     console.log(tile);
        //   }
        //   console.log("---------------------")
        // })
    };
    return Floor;
}());
exports.Floor = Floor;
