"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n\r\n");
    var stringRules = input[0].split("\r\n");
    var stringTickets = input[2].split("\r\n");
    var tickets = helpers_1.parseTickets(stringTickets);
    var rules = helpers_1.parseRules(stringRules);
    determineErrorRate(rules, tickets);
}
function determineErrorRate(rules, tickets) {
    var faultyNumbers = [];
    console.log();
    tickets.forEach(function (ticket) {
        ticket.forEach(function (num) {
            var numIsValid = false;
            for (var i = 0; i < rules.length; i++) {
                if ((num >= rules[i].lowLowerBound && num <= rules[i].lowUpperBound) || (num >= rules[i].highLowerBound && num <= rules[i].highUpperBound)) {
                    numIsValid = true;
                }
            }
            if (!numIsValid) {
                faultyNumbers.push(num);
            }
        });
    });
    console.log(faultyNumbers.reduce(function (acc, num) { return acc + num; }));
}
advent();
