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
        this.children = [];
        var bags = rule.split(/ contain |, /);
        var bagString = bags[0].split(' ');
        bagString.pop();
        this.name = bagString[0] + " " + bagString[1];
        if (bags[1] !== 'no other bags.') {
            for (var i = 1; i < bags.length; i++) {
                var bagSplit = bags[i].split(' ');
                this.childrenNames.push(bagSplit[1] + " " + bagSplit[2]);
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
    return BagRule;
}());
exports.BagRule = BagRule;
