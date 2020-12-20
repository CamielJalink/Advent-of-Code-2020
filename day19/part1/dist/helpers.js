"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRules = exports.Rule = void 0;
var Rule = /** @class */ (function () {
    function Rule(stringRule) {
        var _this = this;
        this.children = [];
        this.childRules = [];
        var nameAndChildren = stringRule.split(":");
        this.name = nameAndChildren[0];
        if (nameAndChildren[1] === ' "a"') {
            this.children.push(["a"]);
        }
        else if (nameAndChildren[1] === ' "b"') {
            this.children.push(["b"]);
        }
        else {
            var childrenSets = nameAndChildren[1].split("|");
            var regex_1 = /[0-9]/g;
            childrenSets.forEach(function (childrenSet) {
                _this.children.push(childrenSet.match(regex_1));
            });
        }
    }
    return Rule;
}());
exports.Rule = Rule;
// Connects rules to each other by-reference, and also returns the starting rule (named 0);
function connectRules(rules) {
    var startingRule;
    rules.forEach(function (rule) {
        rule.children.forEach(function (childrenRule) {
            var childRules = [];
            childrenRule.forEach(function (ruleName) {
                for (var i = 0; i < rules.length; i++) {
                    if (rules[i].name === ruleName) {
                        childRules.push(rules[i]);
                        break;
                    }
                }
            });
            rule.childRules.push(childRules);
        });
        if (rule.name === '0') {
            startingRule = rule;
        }
    });
    return startingRule;
}
exports.connectRules = connectRules;
