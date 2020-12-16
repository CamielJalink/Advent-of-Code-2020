"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToSpokenBefore = void 0;
// De methode hieronder haal ik spokenTurn en currentTurn door elkaar.
function addToSpokenBefore(spokenBefore, num, spokenTurn) {
    var numIsSpokenBefore = false;
    var numNextToSpeak = 0;
    // If num has already been spoken before, update that spokenNumber.
    spokenBefore.forEach(function (spokenNumber) {
        if (spokenNumber.num === num) {
            numNextToSpeak = spokenTurn - spokenNumber.turnSpokenLast;
            spokenNumber.turnSpokenLast = spokenTurn;
            numIsSpokenBefore = true;
        }
    });
    // else, add num as a new spokenNumber
    if (!numIsSpokenBefore) {
        spokenBefore.push({
            num: num,
            turnSpokenLast: spokenTurn
        });
    }
    return numNextToSpeak;
}
exports.addToSpokenBefore = addToSpokenBefore;
