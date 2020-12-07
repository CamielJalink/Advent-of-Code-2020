"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var rules = stringInput.split("\r\n");
    findBagColorsContainingGold(rules);
}
function findBagColorsContainingGold(rules) {
    var bagRules = helpers_1.parseRules(rules);
    var numBagsContainingGold = 0;
    var bagsNeeded = 0;
    bagRules.forEach(function (bagRule) {
        if (bagRule.checkIfContainsColor("shiny gold")) {
            numBagsContainingGold++;
        }
        if (bagRule.name === "shiny gold") {
            bagsNeeded = bagRule.countAllBags() - 1;
        }
    });
    console.log("Answer part one", numBagsContainingGold);
    console.log("I need to own this many bags", bagsNeeded);
}
advent();
