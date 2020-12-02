"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    // Check each password individually, and update the number of correct passwords on a positive response.
    var numValidSledPasswords = 0; // This will contain the answer for part 1
    var numValidTobogganPasswords = 0; // This will contain the answer for part 2
    input.forEach(function (passwordLine) {
        var parsedPassword = passwordLine.split(/\W/); // split password string on '-', ':' and space
        parsedPassword.splice(3, 1); // remove empty string element in the array.
        if (checkSledPasswordValid(Number(parsedPassword[0]), Number(parsedPassword[1]), parsedPassword[2], parsedPassword[3])) {
            numValidSledPasswords++;
        }
        // if(checkTobogganPasswordValid()){
        //   numValidTobogganPasswords++;
        // }
    });
    console.log("Number of valid sled passwords is: ", numValidSledPasswords);
    console.log("Number of valid toboggan passwords is: ", numValidTobogganPasswords);
}
function checkSledPasswordValid(policyLowerBound, policyUpperBound, policyLetter, password) {
    var policyLetterCount = 0;
    for (var i = 0; i < password.length; i++) {
        if (password[i] === policyLetter) {
            policyLetterCount++;
        }
    }
    return (policyLetterCount >= policyLowerBound && policyLetterCount <= policyUpperBound);
}
advent();
