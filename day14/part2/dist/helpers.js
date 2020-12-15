"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMaskToMemory = void 0;
function applyMaskToMemory(currentMask, memoryValue) {
    var binaryValue = memoryValue.toString(2);
    var num0sNeeded = 36 - binaryValue.length;
    for (var i = 0; i < num0sNeeded; i++) {
        binaryValue = '0' + binaryValue;
    }
    var allBinaryMemoryTargets = applyMask(binaryValue, currentMask);
    var allDecimalMemoryTargets = allBinaryMemoryTargets.map(function (binNum) {
        return parseInt(binNum, 2);
    });
    return allDecimalMemoryTargets;
}
exports.applyMaskToMemory = applyMaskToMemory;
function applyMask(binaryValue, mask) {
    var maskedValue = '';
    var numXs = 0;
    for (var i = 0; i < mask.length; i++) {
        if (mask[i] === 'X') {
            maskedValue = maskedValue + 'X';
            numXs++;
        }
        else if (mask[i] === '1') {
            maskedValue = maskedValue + '1';
        }
        else if (mask[i] === '0') {
            maskedValue = maskedValue + binaryValue[i];
        }
    }
    var allCombinations = getAllCombinations(maskedValue, numXs);
    // console.log(allCombinations);
    // Nu heb ik een binaryValue, die is aangepast, en die ook nog eens X'en bevat.
    return allCombinations;
}
function getAllCombinations(maskedValue, numXs) {
    var numCombinations = Math.pow(2, numXs);
    var decimalNumbers = [];
    for (var i = 0; i < numCombinations; i++) {
        decimalNumbers.push(i);
    }
    var longestBinaryLength = decimalNumbers[decimalNumbers.length - 1].toString(2).length;
    var binaryNumbers = decimalNumbers.map(function (decNum) {
        var binNum = decNum.toString(2);
        for (var i = 0; i < longestBinaryLength; i++) {
            if (binNum.length < longestBinaryLength) {
                binNum = '0' + binNum;
            }
        }
        return binNum;
    });
    // console.log(binaryNumbers);
    var allCombinations = [];
    for (var i = 0; i < binaryNumbers.length; i++) {
        var binaryArray = binaryNumbers[i].split("");
        var newCombination = '';
        for (var j = 0; j < maskedValue.length; j++) {
            if (maskedValue[j] === 'X') {
                var nextBin = binaryArray.shift();
                newCombination = newCombination + nextBin;
            }
            else {
                newCombination = newCombination + maskedValue[j];
            }
            newCombination[j];
        }
        allCombinations.push(newCombination);
    }
    return allCombinations;
}
