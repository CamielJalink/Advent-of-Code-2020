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
        return this.winner.name;
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
        var player1Card = this.player1.playCard();
        var player2Card = this.player2.playCard();
        var player1Wins = false;
        // Check the recursive game requirement.
        if (this.player1.cards.length >= player1Card && this.player2.cards.length >= player2Card) {
            player1Wins = this.playRecursiveGame(player1Card, player2Card);
            console.log("A recursive game was played and won by player 1 if true: ", player1Wins);
        }
        else {
            // The non-recursive way of settling a round
            if (player1Card > player2Card) {
                player1Wins = true;
            }
            else if (player2Card > player1Card) {
                player1Wins = false;
            }
        }
        if (player1Wins) {
            this.player1.wonCards(player1Card, player2Card);
        }
        else {
            this.player2.wonCards(player2Card, player1Card);
        }
    };
    Game.prototype.playRecursiveGame = function (player1Card, player2Card) {
        var player1Hand = [];
        var player2Hand = [];
        for (var i = 0; i < player1Card; i++) {
            player1Hand.push(this.player1.cards[i]);
        }
        for (var i = 0; i < player2Card; i++) {
            player2Hand.push(this.player2.cards[i]);
        }
        var subGame = new Game(player1Hand, player2Hand);
        if (subGame.playUntilWinner() === "Player 1") {
            return true;
        }
        else {
            return false;
        }
    };
    return Game;
}());
exports.Game = Game;
