"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.Game = void 0;
var Game = /** @class */ (function () {
    function Game(stringHands) {
        var _this = this;
        this.inProgress = true;
        this.cardsInPlay = 0;
        this.players = [];
        this.winner = undefined;
        stringHands.forEach(function (stringHand) {
            var stringPlayer = stringHand.split('\r\n');
            _this.players.push(new Player(stringPlayer));
        });
        this.players.forEach(function (player) {
            _this.cardsInPlay += player.cards.length;
        });
    }
    Game.prototype.playUntilWinner = function () {
        var _this = this;
        this.winner = this.players[0];
        while (this.inProgress) {
            this.playTurn();
            this.players.forEach(function (player) {
                if (player.cards.length === _this.cardsInPlay) {
                    _this.winner = player;
                    _this.inProgress = false;
                }
            });
        }
        console.log(this.winner.cards);
        return this.winner.calculateScore();
    };
    // Assumes two players for now.
    Game.prototype.playTurn = function () {
        var player1 = this.players[0];
        var player2 = this.players[1];
        var prizeCard;
        if (player1.cards[0] > player2.cards[0]) { // player 1 wins
            prizeCard = player2.handleLostTurn();
            player1.handleWonTurn(prizeCard);
        }
        else if (player2.cards[0] > player1.cards[0]) {
            prizeCard = player1.handleLostTurn();
            player2.handleWonTurn(prizeCard);
        }
    };
    return Game;
}());
exports.Game = Game;
var Player = /** @class */ (function () {
    function Player(stringHand) {
        this.name = stringHand[0];
        stringHand.shift();
        this.cards = stringHand.map(function (stringCard) { return Number(stringCard); });
    }
    Player.prototype.calculateScore = function () {
        var score = 0;
        var reverseCards = this.cards.reverse();
        for (var i = 1; i <= reverseCards.length; i++) {
            score += reverseCards[i - 1] * i;
        }
        return score;
    };
    // Player won a turn, keeps his card and receives a card
    Player.prototype.handleWonTurn = function (prizeCard) {
        var winningCard = this.cards[0];
        this.cards.shift();
        this.cards.push(winningCard);
        this.cards.push(prizeCard);
    };
    // Player lost a turn so loses a card
    Player.prototype.handleLostTurn = function () {
        var cardPrize = this.cards[0];
        this.cards.shift();
        return cardPrize;
    };
    return Player;
}());
exports.Player = Player;
