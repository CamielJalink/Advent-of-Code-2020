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
var player_1 = require("./player");
var Game = /** @class */ (function () {
    function Game(player1Input, player2Input) {
        this.inProgress = true;
        this.cardsInPlay = 0;
        this.p1HandHistory = [];
        this.p2HandHistory = [];
        this.player1 = new player_1.Player("Player 1", player1Input);
        this.player2 = new player_1.Player("Player 2", player2Input);
        this.cardsInPlay = this.player1.cards.length + this.player2.cards.length;
        this.winner = this.player1; // A default winner for initialization.
    }
    Game.prototype.playUntilWinner = function () {
        while (this.inProgress) {
            console.log("Another Loop in paradise");
            if (this.infiniteGameDetected()) {
                this.winner = this.player1;
                this.inProgress = false;
                console.log("Infinite Loop detected, so player 1 wins");
            }
            else {
                this.p1HandHistory.push(__spreadArrays(this.player1.cards));
                this.p2HandHistory.push(__spreadArrays(this.player2.cards));
                this.playTurn();
                if (this.player1.cards.length === this.cardsInPlay) {
                    this.winner = this.player1;
                    this.inProgress = false;
                }
                else if (this.player2.cards.length === this.cardsInPlay) {
                    this.winner = this.player2;
                    this.inProgress = false;
                }
            }
        }
        return this.winner.calculateScore();
    };
    Game.prototype.infiniteGameDetected = function () {
        var infiniteLoopDetected = false;
        var p1HandSeenBefore = false;
        for (var i = 0; i < this.p1HandHistory.length; i++) {
            if (this.checkIdenticalHand(this.p1HandHistory[i], this.player1.cards)) {
                p1HandSeenBefore = true;
                break;
            }
        }
        if (p1HandSeenBefore) {
            for (var i = 0; i < this.p2HandHistory.length; i++) {
                if (this.checkIdenticalHand(this.p2HandHistory[i], this.player2.cards)) {
                    infiniteLoopDetected = true;
                    break;
                }
            }
        }
        return infiniteLoopDetected;
    };
    Game.prototype.checkIdenticalHand = function (historyHand, currentHand) {
        var handsIdentical = true;
        if (historyHand.length !== currentHand.length) {
            handsIdentical = false;
        }
        else {
            for (var i = 0; i < historyHand.length; i++) {
                if (historyHand[i] !== currentHand[i]) {
                    handsIdentical = false;
                    break;
                }
            }
        }
        return handsIdentical;
    };
    // Assumes two players for now.
    Game.prototype.playTurn = function () {
        var prizeCard;
        if (this.player1.cards[0] > this.player2.cards[0]) { // player 1 wins
            prizeCard = this.player2.handleLostTurn();
            this.player1.handleWonTurn(prizeCard);
        }
        else if (this.player2.cards[0] > this.player1.cards[0]) {
            prizeCard = this.player1.handleLostTurn();
            this.player2.handleWonTurn(prizeCard);
        }
    };
    return Game;
}());
exports.Game = Game;
