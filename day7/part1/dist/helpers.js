"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BagRule = exports.parseRules = void 0;
function parseRules(rules) {
    var bagRules = [];
    rules.forEach(function (rule) {
        bagRules.push(new BagRule(rule));
    });
    bagRules.forEach(function (bagRule) {
        bagRule.childrenNames.forEach(function (bagRuleName) {
            bagRules.forEach(function (childRule) {
                if (childRule.name === bagRuleName) {
                    bagRule.children.push(childRule);
                }
            });
        });
    });
    return bagRules;
}
exports.parseRules = parseRules;
var BagRule = /** @class */ (function () {
    function BagRule(rule) {
        this.name = "";
        this.childrenNames = [];
        this.childrenAmounts = []; // [5, 3]
        this.children = []; // [Rood, Blauw]
        var bags = rule.split(/ contain |, /);
        var bagString = bags[0].split(' ');
        bagString.pop();
        this.name = bagString[0] + " " + bagString[1];
        if (bags[1] !== 'no other bags.') {
            for (var i = 1; i < bags.length; i++) {
                var bagSplit = bags[i].split(' ');
                this.childrenNames.push(bagSplit[1] + " " + bagSplit[2]);
                this.childrenAmounts.push(Number(bagSplit[0]));
            }
        }
    }
    BagRule.prototype.checkIfContainsColor = function (color) {
        var containsColor = false;
        this.children.forEach(function (child) {
            if (child.name === color) {
                containsColor = true;
            }
        });
        if (!containsColor) {
            this.children.forEach(function (child) {
                if (child.checkIfContainsColor(color)) {
                    containsColor = true;
                }
            });
        }
        return containsColor;
    };
    // Ik begin met 0 bags voor m'n golden bag. 
    BagRule.prototype.countAllBags = function () {
        var numBags = 0;
        if (this.children.length === 0) { // Als ik geen kinderen heb, tel mezelf.
            return 1;
        }
        else {
            // 3 rode   &  2 oranje
            for (var i = 0; i < this.childrenAmounts.length; i++) {
                numBags += this.childrenAmounts[i] * this.children[i].countAllBags();
            }
            numBags++;
        }
        return numBags;
    };
    return BagRule;
}());
exports.BagRule = BagRule;
