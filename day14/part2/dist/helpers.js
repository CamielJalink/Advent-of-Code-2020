"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMaskToDecimal = void 0;
function applyMaskToDecimal(currentMask, decimalValue) {
    var binaryValue = decimalValue.toString(2);
    var num0sNeeded = 36 - binaryValue.length;
    for (var i = 0; i < num0sNeeded; i++) {
        binaryValue = '0' + binaryValue;
    }
    binaryValue = applyMask(binaryValue, currentMask);
    return parseInt(binaryValue, 2);
}
exports.applyMaskToDecimal = applyMaskToDecimal;
function applyMask(binaryValue, mask) {
    var maskedValue = '';
    for (var i = 0; i < mask.length; i++) {
        if (mask[i] === 'X') { // If we find an X, the value stays the same
            maskedValue = maskedValue + binaryValue[i];
        }
        else if (mask[i] === '1') {
            maskedValue = maskedValue + '1';
        }
        else if (mask[i] === '0') {
            maskedValue = maskedValue + '0';
        }
    }
    return maskedValue;
}
