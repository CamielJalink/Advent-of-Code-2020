"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n\r\n");
    console.log(sumGroupAnswers(input));
}
function sumGroupAnswers(rawGroupAnswers) {
    var groupAnswers = rawGroupAnswers.map(function (rawGroup) {
        return rawGroup.split("\r\n");
    });
    var totalFoundAnswers = 0;
    groupAnswers.forEach(function (group) {
        var foundAnswers = [];
        group.forEach(function (answer) {
            for (var i = 0; i < answer.length; i++) {
                if (!foundAnswers.includes(answer[i])) {
                    foundAnswers.push(answer[i]);
                }
            }
        });
        totalFoundAnswers += foundAnswers.length;
    });
    return totalFoundAnswers;
}
advent();
