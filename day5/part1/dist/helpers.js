"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNumber = void 0;
function findNumber(code) {
    var lowerBound = 0;
    var upperBound = Math.pow(2, code.length) - 1; // 8 for seats, 128 for rows.
    for (var i = 0; i < code.length; i++) {
        var relevantArea = upperBound - lowerBound + 1;
        if (code[i] === 'L' || code[i] === 'F') { // F and L are the lower halves
            upperBound = upperBound - (relevantArea / 2);
        }
        else {
            lowerBound = lowerBound + (relevantArea / 2);
        }
    }
    return lowerBound; // lowerbound and upperbound are now the same number
}
exports.findNumber = findNumber;
