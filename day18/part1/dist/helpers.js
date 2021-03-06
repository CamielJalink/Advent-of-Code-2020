"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpressionArray = exports.findFullNumber = exports.findClosingBracket = exports.parseExpressions = void 0;
function parseExpressions(expressions) {
    var parsedExpressions = [];
    var regex = /\S/g;
    expressions.forEach(function (expression) {
        var expressionArray = expression.match(regex);
        var parsedExpression = '';
        if (expressionArray) {
            parsedExpression = expressionArray.reduce(function (accString, char) { return accString + char; });
        }
        parsedExpressions.push(parsedExpression);
    });
    return parsedExpressions;
}
exports.parseExpressions = parseExpressions;
function findClosingBracket(expression, openingBracketI) {
    var numInnerBrackets = 0;
    var closingBracketI = openingBracketI;
    for (var i = openingBracketI + 1; i < expression.length; i++) {
        if (expression[i] === ')' && numInnerBrackets === 0) {
            closingBracketI = i;
            break;
        }
        else if (expression[i] === ')') {
            numInnerBrackets--;
        }
        else if (expression[i] === '(') {
            numInnerBrackets++;
        }
    }
    return closingBracketI;
}
exports.findClosingBracket = findClosingBracket;
function findFullNumber(expression, numStartingI) {
    var fullNumber = '';
    for (var i = numStartingI; i < expression.length; i++) {
        if (isNaN(Number(expression[i])) === false) {
            fullNumber += expression[i];
        }
        else {
            break;
        }
    }
    return Number(fullNumber);
}
exports.findFullNumber = findFullNumber;
function createExpressionArray(expression) {
    var expressionArray = [];
    for (var i = 0; i < expression.length; i++) {
        if (isNaN(Number(expression[i])) === false) {
            expressionArray.push(findFullNumber(expression, i));
        }
        else if (expression[i] === '(') {
            var closingBracketI = findClosingBracket(expression, i);
            var innerExpression = expression.substring(i + 1, closingBracketI);
            i = closingBracketI;
            expressionArray.push(innerExpression);
        }
        else {
            expressionArray.push(expression[i]);
        }
    }
    return expressionArray;
}
exports.createExpressionArray = createExpressionArray;
