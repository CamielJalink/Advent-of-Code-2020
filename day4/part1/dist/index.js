"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n\r\n");
    console.log(countValidPassports(input));
}
function countValidPassports(passportsRaw) {
    var parsedPasswords = helpers_1.parsePasswords(passportsRaw);
    var numValidPasswords = 0;
    parsedPasswords.forEach(function (password) {
        var passwordIsValid = false;
        if (password.length === 8) {
            passwordIsValid = true;
        }
        else if (password.length === 7 && !helpers_1.passwordHasProp(password, "cid")) {
            passwordIsValid = true;
        }
        if (passwordIsValid) {
            numValidPasswords++;
        }
    });
    return numValidPasswords;
}
advent();
