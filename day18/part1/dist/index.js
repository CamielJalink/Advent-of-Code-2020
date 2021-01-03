"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    var expressions = helpers_1.parseExpressions(input);
    var result = 0;
    expressions.forEach(function (expression) {
        result += solveExpression(expression);
    });
    console.log("Result of adding all numbers together is: ", result);
}
function solveExpression(expression) {
    var expressionArray = [];
    for (var i = 0; i < expression.length; i++) {
        if (isNaN(Number(expression[i])) === false) {
            expressionArray.push(helpers_1.findFullNumber(expression, i));
        }
        else if (expression[i] === '(') {
            var closingBracketI = helpers_1.findClosingBracket(expression, i);
            var innerExpression = expression.substring(i + 1, closingBracketI);
            i = closingBracketI;
            expressionArray.push(innerExpression);
        }
        else {
            expressionArray.push(expression[i]);
        }
    }
    if (isNaN(expressionArray[0])) {
        expressionArray[0] = solveExpression(expressionArray[0]);
    }
    var result = expressionArray.shift();
    while (expressionArray.length > 1) {
        var sign = expressionArray[0];
        var elem2 = expressionArray[1];
        if (isNaN(elem2)) {
            elem2 = solveExpression(elem2);
        }
        result = solveOneStep(result, sign, elem2);
        expressionArray.shift();
        expressionArray.shift();
    }
    return result;
}
function solveOneStep(num1, sign, num2) {
    if (sign === '+') {
        return num1 + num2;
    }
    else if (sign === '*') {
        return num1 * num2;
    }
    else {
        console.error("verkeerde symbool!");
        return -1;
    }
}
advent();
