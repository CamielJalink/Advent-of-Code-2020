"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var rulesAndMessages = stringInput.split("\r\n\r\n");
    var messages = rulesAndMessages[1].split("\r\n");
    var stringRules = rulesAndMessages[0].split("\r\n");
    var rules = stringRules.map(function (stringRule) {
        return new helpers_1.Rule(stringRule);
    });
    var startingRule = helpers_1.connectRules(rules);
    checkMessageValidity(startingRule, messages);
    console.log(rules[4]);
}
function checkMessageValidity(startingRule, messages) {
    console.log(startingRule.childRules[0]);
}
advent();
