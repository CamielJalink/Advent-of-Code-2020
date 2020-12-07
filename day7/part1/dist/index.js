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
    var bagRuleSet = helpers_1.parseRules(rules);
    var differentColors = new Set(); // This should become a Set!
    bagRuleSet.forEach(function (bagRules) {
        // Je moet niet de outermost bag pakken, maar de parentbag
        for (var i = 0; i < bagRules.length; i++) {
            if (i > 0 && bagRules[i].color === 'gold' && bagRules[i].adjective === 'shiny') {
                differentColors.add(bagRules[i - 1].color);
            }
        }
    });
    console.log(differentColors);
}
advent();
