"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n\r\n");
    findNumGroupAnswers(input);
}
function findNumGroupAnswers(groupAnswersRaw) {
    var groupAnswers = groupAnswersRaw.map(function (rawGroup) {
        return rawGroup.split("\r\n");
    });
    var totalFoundAnswers = 0;
    var totalSharedAnswers = 0;
    groupAnswers.forEach(function (group) {
        var foundAnswers = [];
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
        totalFoundAnswers += foundAnswers.length;
    });
    console.log("Number of total different-answers-per-group is: " + totalFoundAnswers);
    console.log("Number of total shared-answers-per-group is: " + totalSharedAnswers);
}
advent();
