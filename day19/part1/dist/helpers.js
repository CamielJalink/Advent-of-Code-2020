"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRules = exports.Rule = void 0;
var Rule = /** @class */ (function () {
    function Rule(stringRule) {
        var _this = this;
        this.children = [];
        this.childRulesSets = [];
        this.validAnswers = [];
        var nameAndChildren = stringRule.split(":");
        this.name = nameAndChildren[0];
        if (nameAndChildren[1] === ' "a"') {
            this.validAnswers.push("a");
        }
        else if (nameAndChildren[1] === ' "b"') {
            this.validAnswers.push("b");
        }
        else {
            var childrenSets = nameAndChildren[1].split("|");
            var regex_1 = /[0-9]/g;
            childrenSets.forEach(function (childrenSet) {
                _this.children.push(childrenSet.match(regex_1));
            });
        }
    }
    Rule.prototype.createValidAnswers = function () {
        var _this = this;
        if (this.childRulesSets.length === 0) {
            return this.validAnswers;
        }
        else {
            this.childRulesSets.forEach(function (childRules) {
                // Hierbinnen maak ik voor '2' een validAnswer en voor '3' ook.
                // Dit stukje hieronder werkt voor 1 childRuleSet.
                childRules.forEach(function (childRule) {
                    var _a;
                    (_a = _this.validAnswers).push.apply(_a, childRule.createValidAnswers());
                });
            });
            return this.validAnswers;
        }
    };
    return Rule;
}());
exports.Rule = Rule;
// Connects rules to each other by-reference, and also returns the starting rule (named 0);
function connectRules(rules) {
    var startingRule = rules[0];
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
            if (rule.name !== 'a' && rule.name !== 'b') {
                rule.childRulesSets.push(childRules);
            }
        });
        if (rule.name === '0') {
            startingRule = rule;
        }
    });
    return startingRule;
}
exports.connectRules = connectRules;
