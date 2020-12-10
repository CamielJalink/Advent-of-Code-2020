"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidNumber = exports.updatePreamble = void 0;
function updatePreamble(preamble) {
    var nextPointer = preamble[preamble.length - 1] + 1;
    preamble.push(nextPointer);
    preamble.shift();
    return preamble;
}
exports.updatePreamble = updatePreamble;
function isValidNumber(input, preamble, target) {
    var preambleNumbers = preamble.map(function (pointer) {
        return input[pointer];
    });
    var targetIsValid = false;
    preambleNumbers.forEach(function (preambleNum) {
        preambleNumbers.forEach(function (preambleNum2) {
            if (preambleNum + preambleNum2 === target) {
                targetIsValid = true;
            }
        });
    });
    return targetIsValid;
}
exports.isValidNumber = isValidNumber;
