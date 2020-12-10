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
    for (var i = 0; i < input.length; i++) {
        var attempt = [];
        if (input[i] < target) {
            attempt.push(input[i]);
            var res = recursiveCheck(input, attempt, target);
            if (res === [-1]) {
                console.log("AWWW YISS");
            }
        }
    }
}
function recursiveCheck(input, attempt, target) {
    input.forEach(function (num) {
        var doneWithLoop = false;
        if (!attempt.includes(num)) { // Numbers already in attempt can't be used again.
            var attemptSoFar = attempt.reduce(function (acc, nextNum) { return acc + nextNum; });
            if (attemptSoFar + num === target) {
                console.log("YES WE GOT EM");
                console.log(attempt);
                console.log("Don't forget to find out the answer bubby");
                doneWithLoop = true;
            }
            else if (attemptSoFar + num < target) { // We zijn er nog niet, maar zou nog kunnen!
                attempt.push(num);
                recursiveCheck(input, attempt, target);
            }
            else if (attemptSoFar + num > target) { // Dit recente getal is 't niet, maar we gaan door binnen deze loop.
                // met het afgelopen getal werkte het iig niet
                attempt.pop();
            }
        }
    });
    return attempt;
}
// - Probeer de vergelijking niet met hetzelfde getal, dus niet input[i] + input2[i];
// Als alles in attempt + input2[i] === target.
// Jay, we got em!
// Als alles in attempt + input2[i] > target
// deze is het niet, doe input2[i+1]
// Else
// Voeg input2[i] toe aan 'attempt'
// Stap een laag dieper (recursie)
