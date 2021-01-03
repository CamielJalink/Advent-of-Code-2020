"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    var expressions = helpers_1.parseExpressions(input);
    console.log(expressions);
    expressions.forEach(function (expression) {
        solveExpression(expression);
    });
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
            // recursie?
        }
        else {
            expressionArray.push(expression[i]);
        }
    }
    console.log(expressionArray);
}
// Van links naar rechts in plaats van * voor +.
// // Haakjes herkennen is interessant. 
// 1 + 2 * 3 + 4 * 5 + 6
// 1 + (2 * 3) + (4 * (5 + 6))
// 2 * 3 + (4 * 5)
// 5 + (8 * 3 + 9 + 3 * 4 * 3)
// 5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
// ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2
// Begin met parsen vanaf links.
// Als je een haakje vindt, zoek 't sluit haakje dat erbij hoort. Getal 1 (of 2) wordt parseSom met alles tussen de haakjes
// Linker getal heet getal 1. 
// Als haakje, dan wordt het linker getal het resultaat van alles erbinnen.
// ParseSom functie die we recursief kunnen aanroepen? 
//  3 + (3 * 3)
//  parseSom zou hier terug moeten geven: 3 + 9 = 12. 
//  number 1 is getal 3.
//  numbre 2 is parseSom(alles binnen haakjes)
//  parseSom geeft dus resultaat terug van z'n berekening.
// Ik wil iig
advent();
