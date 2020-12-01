"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8").split("\r\n");
    var input = stringInput.map(function (stringNum) { return Number(stringNum); });
    console.log(findPair(input));
}
function findPair(input) {
    var intendedResult = 2020;
    var correctPair = 0;
    var correctTriplet = 0;
    input.forEach(function (num1) {
        input.forEach(function (num2) {
            input.forEach(function (num3) {
                if (num1 + num2 + num3 === intendedResult) {
                    correctTriplet = num1 * num2 * num3;
                }
            });
            if (num1 + num2 === intendedResult) {
                correctPair = num1 * num2;
            }
        });
    });
    return "part one: " + correctPair.toString() + " part two: " + correctTriplet.toString();
}
advent();
