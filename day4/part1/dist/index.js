"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n\r\n");
    countValidPassports(input);
}
function countValidPassports(passportsRaw) {
    var parsedPasswords = helpers_1.parsePasswords(passportsRaw);
    var numPresentPasswords = 0; // The number of passwords that have all required fields 
    var numValidPasswords = 0;
    parsedPasswords.forEach(function (password) {
        var allPresent = false;
        if (password.length === 8 || (password.length === 7 && !helpers_1.passwordHasProp(password, "cid"))) {
            numPresentPasswords++;
            allPresent = true;
        }
        var passwordIsValid = true;
        password.forEach(function (prop) {
            if (helpers_1.propIsValid(prop) === false) {
                passwordIsValid = false;
                console.log("I FOUND A FAULTY PROP!");
            }
        });
        if (passwordIsValid && allPresent) {
            numValidPasswords++;
        }
    });
    console.log("Number of passwords with all fields present: " + numPresentPasswords);
    console.log("Number of passwords that are valid " + numValidPasswords);
}
advent();
