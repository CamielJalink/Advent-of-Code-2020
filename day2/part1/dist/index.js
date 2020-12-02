"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    var numValidPasswords = 0;
    input.forEach(function (passwordLine) {
        if (checkPasswordValid(passwordLine)) {
            numValidPasswords++;
        }
    });
    console.log(numValidPasswords);
}
function checkPasswordValid(passwordLine) {
    var passLineArray = passwordLine.split(": ");
    var password = passLineArray[1];
    var policy = passLineArray[0].split(" ");
    var policyLetter = policy[1];
    var policyNumbers = policy[0].split("-");
    var policyLowerBound = Number(policyNumbers[0]);
    var policyUpperBound = Number(policyNumbers[1]);
    // Regular expression gebruiken om te splitten op meerdere zaken? 
    var policyLetterCount = 0;
    for (var i = 0; i < password.length; i++) {
        if (password[i] === policyLetter) {
            policyLetterCount++;
        }
    }
    if (policyLetterCount >= policyLowerBound && policyLetterCount <= policyUpperBound) {
        return true;
    }
    else {
        return false;
    }
}
advent();
