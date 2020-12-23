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
    Player.prototype.playCard = function () {
        var card = this.cards[0];
        this.cards.shift();
        return card;
    };
    Player.prototype.wonCards = function (ownCard, prizeCard) {
        this.cards.push(ownCard);
        this.cards.push(prizeCard);
    };
    return Player;
}());
exports.Player = Player;
