"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(name, startingCards) {
        this.name = name;
        this.cards = startingCards;
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
