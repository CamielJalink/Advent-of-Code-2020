"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    findJoltage(input);
}
function findJoltage(input) {
    var numInput = input.map(function (stringVoltage) { return Number(stringVoltage); });
    var sortedInput = numInput.sort(function (a, b) {
        if (a < b) {
            return -1;
        }
        else if (b < a) {
            return 1;
        }
        else {
            return 0;
        }
    });
    var maxAdapterVoltage = 0;
    sortedInput.forEach(function (adapterVoltage) {
        if (adapterVoltage > maxAdapterVoltage) {
            maxAdapterVoltage = adapterVoltage;
        }
    });
    sortedInput.unshift(0); // The 0-adapter from the outlet
    sortedInput.push(maxAdapterVoltage + 3); // Add phone's adapter, which is 3 + the highest, to the list
    count1sAnd3s(sortedInput);
    console.log(sortedInput);
}
function count1sAnd3s(sortedInput) {
    var num1s = 0;
    var num3s = 0;
    for (var i = 0; i < sortedInput.length; i++) {
        if (sortedInput[i + 1] - sortedInput[i] === 1) {
            num1s++;
        }
        else if (sortedInput[i + 1] - sortedInput[i] === 3) {
            num3s++;
        }
    }
    console.log("This many one-steps:", num1s);
    console.log("This many three-steps:", num3s);
    console.log("Multiplied", num1s * num3s);
}
advent();
