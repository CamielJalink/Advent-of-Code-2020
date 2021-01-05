"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    var expressions = helpers_1.parseExpressions(input);
    var result = 0;
    expressions.forEach(function (expression) {
        var expressionResult = solveExpression(expression);
        console.log(expressionResult);
        result += expressionResult;
    });
    console.log("Result of adding all numbers together is: ", result);
}
function solveExpression(expression) {
    var expressionArray = helpers_1.createExpressionArray(expression);
    if (isNaN(expressionArray[0])) {
        expressionArray[0] = solveExpression(expressionArray[0]);
    }
    var additionSolved = [];
    while (expressionArray.length > 1) {
        var elem1 = expressionArray[0];
        var sign = expressionArray[1];
        var elem2 = expressionArray[2];
        if (isNaN(elem1)) {
            elem1 = solveExpression(elem1);
        }
        if (isNaN(elem2)) {
            elem2 = solveExpression(elem2);
        }
        if (sign === '*') {
            additionSolved.push(elem1);
            additionSolved.push(sign);
            expressionArray.shift();
            expressionArray.shift();
        }
        else if (sign === '+') {
            var plusResult = solveOneStep(elem1, sign, elem2);
            expressionArray.shift();
            expressionArray.shift();
            expressionArray[0] = plusResult;
        }
    }
    additionSolved = __spreadArrays(additionSolved, expressionArray); // Add the final bits
    if (isNaN(additionSolved[0])) {
        additionSolved[0] = solveExpression(additionSolved[0]);
    }
    var result = additionSolved.shift();
    while (additionSolved.length > 1) {
        var sign = additionSolved[0];
        var elem2 = additionSolved[1];
        if (isNaN(elem2)) {
            elem2 = solveExpression(elem2);
        }
        result = solveOneStep(result, sign, elem2);
        additionSolved.shift();
        additionSolved.shift();
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
