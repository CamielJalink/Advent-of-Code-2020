"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n\r\n");
    var groupAnswers = input.map(function (rawGroup) {
        return rawGroup.split("\r\n");
    });
    console.log(sumGroupAnswers(groupAnswers));
    console.log(sumGroupSharedAnswers(groupAnswers));
}
function sumGroupAnswers(groupAnswers) {
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
function sumGroupSharedAnswers(groupAnswers) {
    var totalSharedAnswers = 0;
    groupAnswers.forEach(function (group) {
        var foundAnswers = [];
        var foundSharedAnswers = [];
        group.forEach(function (answerSheet) {
            for (var i = 0; i < answerSheet.length; i++) {
                if (!foundAnswers.includes(answerSheet[i])) {
                    foundAnswers.push(answerSheet[i]);
                }
            }
        });
        foundAnswers.forEach(function (answer) {
            var answerIsShared = true;
            group.forEach(function (answerSheet) {
                if (!answerSheet.includes(answer)) {
                    answerIsShared = false;
                }
            });
            if (answerIsShared) {
                totalSharedAnswers++;
            }
        });
    });
    return totalSharedAnswers;
}
advent();
