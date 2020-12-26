"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Game = /** @class */ (function () {
    function Game(gameState) {
        this.currentMove = 0;
        this.gameState = gameState;
        console.log(this.gameState);
    }
    Game.prototype.playMove = function () {
        var currentCup = this.gameState[0];
        var pickedUpCups = this.gameState.slice(1, 4);
        this.gameState = __spreadArrays([currentCup], this.gameState.slice(4));
        var target = this.findTarget(currentCup, pickedUpCups);
        this.insertIntoGamestate(target, pickedUpCups);
        // When the move is done, update the gameState.
        currentCup = this.gameState.shift();
        this.gameState.push(currentCup);
    };
    Game.prototype.findTarget = function (currentCup, pickedUpCups) {
        var target = currentCup - 1;
        var stillSearching = true;
        while (stillSearching) {
            if (target === 0) {
                target = 9;
            }
            if (pickedUpCups.includes(target)) {
                target = target - 1;
            }
            else {
                stillSearching = false;
            }
        }
        return target;
    };
    Game.prototype.insertIntoGamestate = function (targetCup, pickedUpCups) {
        var newGameState = [];
        for (var i = 0; i < this.gameState.length; i++) {
            if (this.gameState[i] === targetCup) {
                newGameState = __spreadArrays(this.gameState.slice(0, i + 1), pickedUpCups, this.gameState.slice(i + 1));
                break;
            }
        }
        this.gameState = newGameState;
    };
    Game.prototype.printState = function () {
        console.log(this.gameState);
    };
    Game.prototype.cupsAfter1 = function () {
        var cupsAfter1 = [];
        for (var i = 0; i < this.gameState.length; i++) {
            if (this.gameState[i] === 1) {
                cupsAfter1 = __spreadArrays(this.gameState.slice(i + 1), this.gameState.slice(0, i));
            }
        }
        console.log("Starting from the 1 cup, cups are: ", cupsAfter1);
    };
    return Game;
}());
exports.Game = Game;
