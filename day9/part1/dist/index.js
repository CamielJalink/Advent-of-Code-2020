"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n").map(function (stringNum) {
        return Number(stringNum);
    });
    var xmasNumber = findFirstXmasNumber(input, 25);
    findEncryptionWeakness(input, xmasNumber);
}
advent();
function findFirstXmasNumber(input, preambleLength) {
    var preamble = [];
    var xmasNumber = 0;
    for (var i = 0; i < preambleLength; i++) {
        preamble[i] = i;
    }
    for (var i = preamble.length; i < input.length; i++) {
        var nextNum = input[i];
        if (!helpers_1.isValidNumber(input, preamble, nextNum)) {
            console.log("Invalid number found: " + nextNum);
            xmasNumber = nextNum;
            break;
        }
        helpers_1.updatePreamble(preamble);
    }
    return xmasNumber;
}
function findEncryptionWeakness(input, target) {
    var foundNumbers = false;
    var attempt = [];
    for (var i = 0; i < input.length; i++) {
        attempt = [];
        attempt.push(input[i]);
        var _loop_1 = function (j) {
            if (j > i) {
                var attemptSum_1 = 0;
                attempt.forEach(function (num) { return attemptSum_1 += num; });
                if (attemptSum_1 + input[j] > target) {
                    return "break";
                }
                else if (attemptSum_1 + input[j] === target) {
                    attempt.push(input[j]);
                    foundNumbers = true;
                    return "break";
                }
                else {
                    attempt.push(input[j]);
                }
            }
        };
        for (var j = 0; j < input.length; j++) {
            var state_1 = _loop_1(j);
            if (state_1 === "break")
                break;
        }
        if (foundNumbers) {
            break;
        }
    }
    console.log("correct numbers found are in this attempt:" + attempt);
    var lowestNum = attempt[0];
    var highestNum = attempt[0];
    attempt.forEach(function (num) {
        if (num > highestNum) {
            highestNum = num;
        }
        if (num < lowestNum) {
            lowestNum = num;
        }
    });
    var encryptionWeakness = lowestNum + highestNum;
    console.log("Encryption weakness is: " + encryptionWeakness);
}
