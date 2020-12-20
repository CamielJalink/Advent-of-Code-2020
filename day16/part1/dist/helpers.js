"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = exports.parseRules = exports.parseTickets = void 0;
function parseTickets(stringTickets) {
    var tickets = [];
    for (var i = 1; i < stringTickets.length; i++) { // ignore the first "ticket" which is just the label.
        var stringTicket = stringTickets[i].split(',');
        var ticket = stringTicket.map(function (stringNumber) { return Number(stringNumber); });
        tickets.push(ticket);
    }
    return tickets;
}
exports.parseTickets = parseTickets;
function parseRules(stringRules) {
    var rules = [];
    for (var i = 0; i < stringRules.length; i++) {
        var rule = new Rule(stringRules[i], i);
        rules.push(rule);
    }
    return rules;
}
exports.parseRules = parseRules;
var Rule = /** @class */ (function () {
    function Rule(stringRule, ruleId) {
        this.ruleId = ruleId;
        var splitRule = stringRule.split(/: | or |-/g);
        this.ruleName = splitRule[0];
        this.lowLowerBound = Number(splitRule[1]);
        this.lowUpperBound = Number(splitRule[2]);
        this.highLowerBound = Number(splitRule[3]);
        this.highUpperBound = Number(splitRule[4]);
    }
    return Rule;
}());
exports.Rule = Rule;
