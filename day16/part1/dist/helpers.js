"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = exports.parseColumns = exports.Rule = exports.parseRules = exports.parseTickets = void 0;
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
        this.isDeparture = false;
        this.ruleId = ruleId;
        var splitRule = stringRule.split(/: | or |-/g);
        this.ruleName = splitRule[0];
        if (this.ruleName.split(' ')[0] === "departure") {
            this.isDeparture = true;
        }
        this.lowLowerBound = Number(splitRule[1]);
        this.lowUpperBound = Number(splitRule[2]);
        this.highLowerBound = Number(splitRule[3]);
        this.highUpperBound = Number(splitRule[4]);
    }
    Rule.prototype.isValidNumber = function (num) {
        if ((num >= this.lowLowerBound && num <= this.lowUpperBound) || (num >= this.highLowerBound && num <= this.highUpperBound)) {
            return true;
        }
        else {
            return false;
        }
    };
    return Rule;
}());
exports.Rule = Rule;
function parseColumns(tickets) {
    var columns = [];
    var _loop_1 = function (i) {
        var columnNumbers = [];
        tickets.forEach(function (ticket) {
            columnNumbers.push(ticket[i]);
        });
        columns.push(new Column(i, columnNumbers));
    };
    for (var i = 0; i < tickets[0].length; i++) {
        _loop_1(i);
    }
    return columns;
}
exports.parseColumns = parseColumns;
var Column = /** @class */ (function () {
    function Column(ticketNumberId, columnNumbers) {
        this.numbers = [];
        this.rules = [];
        this.validRules = [];
        this.ticketNumberId = ticketNumberId;
        this.numbers = columnNumbers;
    }
    Column.prototype.filterRules = function () {
        var _this = this;
        this.rules.forEach(function (rule) {
            var ruleIsValid = true;
            for (var i = 0; i < _this.numbers.length; i++) {
                if (rule.isValidNumber(_this.numbers[i]) === false) {
                    ruleIsValid = false;
                    break;
                }
            }
            if (ruleIsValid) {
                _this.validRules.push(rule);
            }
        });
    };
    return Column;
}());
exports.Column = Column;
