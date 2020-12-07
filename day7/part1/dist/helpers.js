"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BagRule = exports.parseRules = void 0;
function parseRules(rules) {
    var bagRuleSet = [];
    rules.forEach(function (ruleSet) {
        var bagRules = [];
        ruleSet.split(/ contain |, /).forEach(function (bagRuleString) {
            if (bagRuleString !== 'no other bags.') {
                bagRules.push(new BagRule(bagRuleString));
            }
        });
        bagRuleSet.push(bagRules);
    });
    return bagRuleSet;
}
exports.parseRules = parseRules;
// Kan ik een rule opsplitsen in bags? 
var BagRule = /** @class */ (function () {
    function BagRule(bagRuleString) {
        this.amount = 1;
        var stringProperties = bagRuleString.split(' ');
        if (!isNaN(Number(stringProperties[0]))) {
            this.amount = Number(stringProperties[0]);
            stringProperties.shift();
        }
        this.adjective = stringProperties[0];
        this.color = stringProperties[1];
    }
    return BagRule;
}());
exports.BagRule = BagRule;
