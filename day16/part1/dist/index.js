"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n\r\n");
    var stringRules = input[0].split("\r\n");
    var stringTickets = input[2].split("\r\n");
    var myTicket = input[1].split("\r\n");
    var tickets = helpers_1.parseTickets(stringTickets);
    var rules = helpers_1.parseRules(stringRules);
    tickets = determineErrorRate(rules, tickets);
    var columns = helpers_1.parseColumns(tickets);
    matchRulesAndColumns(rules, columns);
    parseMyTicket(myTicket, rules, columns);
}
function determineErrorRate(rules, tickets) {
    var filteredTickets = [];
    tickets.forEach(function (ticket) {
        var ticketIsValid = true;
        ticket.forEach(function (num) {
            var numIsValid = false;
            for (var i = 0; i < rules.length; i++) {
                if ((num >= rules[i].lowLowerBound && num <= rules[i].lowUpperBound) || (num >= rules[i].highLowerBound && num <= rules[i].highUpperBound)) {
                    numIsValid = true;
                }
            }
            if (!numIsValid) {
                ticketIsValid = false;
            }
        });
        if (ticketIsValid) {
            filteredTickets.push(ticket);
        }
    });
    return filteredTickets;
}
function matchRulesAndColumns(rules, columns) {
    columns.forEach(function (column) {
        column.rules = rules;
        column.filterRules();
    });
    var keepFiltering = true;
    var _loop_1 = function () {
        var columnWithMultipleRulesExists = false;
        columns.forEach(function (column) {
            if (column.validRules.length === 1) {
                filterClaimedRules(column, columns, column.validRules[0]);
            }
        });
        columns.forEach(function (column) {
            if (column.validRules.length > 1) {
                columnWithMultipleRulesExists = true;
            }
        });
        if (!columnWithMultipleRulesExists) {
            keepFiltering = false;
        }
    };
    while (keepFiltering) {
        _loop_1();
    }
}
function filterClaimedRules(owningColumn, columns, claimedRule) {
    columns.forEach(function (column) {
        if (column !== owningColumn) {
            var newRules_1 = [];
            column.validRules.forEach(function (rule) {
                if (rule !== claimedRule) {
                    newRules_1.push(rule);
                }
            });
            column.validRules = newRules_1;
        }
    });
}
function parseMyTicket(myTicket, rules, columns) {
    var myTicketStringNumbers = myTicket[1].split(',');
    var myTicketNumbers = myTicketStringNumbers.map(function (stringNum) { return Number(stringNum); });
    var departureRules = [];
    rules.forEach(function (rule) {
        if (rule.isDeparture) {
            departureRules.push(rule);
        }
    });
    var relevantRuleIds = [];
    columns.forEach(function (column) {
        if (departureRules.includes(column.validRules[0])) {
            relevantRuleIds.push(column.ticketNumberId);
        }
    });
    var productOfDepartureValues = 1;
    for (var i = 0; i < myTicketNumbers.length; i++) {
        if (relevantRuleIds.includes(i)) {
            productOfDepartureValues *= myTicketNumbers[i];
        }
    }
    console.log(productOfDepartureValues);
}
advent();
