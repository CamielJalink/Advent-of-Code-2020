"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var cup_1 = require("./cup");
var Game = /** @class */ (function () {
    function Game(gameState) {
        var _this = this;
        this.gameState = new Map();
        this.pickedUpCups = [];
        var tempGameState = [];
        this.currentCup = new cup_1.Cup(gameState[0]);
        tempGameState.push(this.currentCup);
        for (var i = 1; i < gameState.length; i++) {
            var cup = new cup_1.Cup(gameState[i]);
            cup.prevCup = tempGameState[i - 1];
            cup.prevCup.nextCup = cup;
            tempGameState.push(cup);
        }
        tempGameState[0].prevCup = tempGameState[tempGameState.length - 1];
        tempGameState[tempGameState.length - 1].nextCup = tempGameState[0];
        tempGameState.forEach(function (cup) {
            _this.gameState.set(cup.name, cup);
        });
    }
    Game.prototype.playMove = function () {
        // Pick up three cups and close the circle behind them
        this.pickUpCups();
        // Find the target cup
        var target = this.findTarget();
        // Insert picked up cups behind the target and fix their references
        this.insertIntoGamestate(target);
        // When the move is done, update the gameState.
        this.currentCup = this.currentCup.nextCup;
    };
    Game.prototype.pickUpCups = function () {
        var cup1 = this.currentCup.nextCup;
        var cup2 = cup1.nextCup;
        var cup3 = cup2.nextCup;
        var cup4 = cup3.nextCup;
        this.pickedUpCups = [cup1, cup2, cup3];
        // close the circle behind picked up cups;
        this.currentCup.nextCup = cup4;
        cup4.prevCup = this.currentCup;
    };
    Game.prototype.findTarget = function () {
        var targetName = this.currentCup.name - 1;
        var stillSearching = true;
        while (stillSearching) {
            if (targetName === 0) {
                targetName = 1000000;
            }
            var targetInPickedUp = false;
            for (var i = 0; i < this.pickedUpCups.length; i++) {
                if (this.pickedUpCups[i].name === targetName) {
                    targetInPickedUp = true;
                }
            }
            if (targetInPickedUp) {
                targetName = targetName - 1;
            }
            else {
                stillSearching = false;
            }
        }
        var targetCup = new cup_1.Cup(-1);
        var target = this.gameState.get(targetName);
        if (target !== undefined) {
            targetCup = target;
        }
        return targetCup;
    };
    Game.prototype.insertIntoGamestate = function (targetCup) {
        var cup1 = this.pickedUpCups[0];
        var cup3 = this.pickedUpCups[2];
        cup3.nextCup = targetCup.nextCup;
        targetCup.nextCup = cup1;
        cup1.prevCup = targetCup;
        targetCup.nextCup.prevCup = cup3;
    };
    Game.prototype.findTwoCupsAfter1 = function () {
        var cup1 = this.gameState.get(1);
        console.log(cup1);
        if (cup1 !== undefined) {
            var cup2 = cup1.nextCup;
            var cup3 = cup2.nextCup;
            console.log(cup2);
            console.log(cup3);
            console.log(cup2.name * cup3.name);
        }
    };
    return Game;
}());
exports.Game = Game;
