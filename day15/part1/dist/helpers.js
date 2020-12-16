"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToSpokenBefore = void 0;
function addToSpokenBefore(spokenBefore, num, spokenTurn) {
    var numNextToSpeak = 0;
    if (spokenBefore.has(num)) {
        numNextToSpeak = spokenTurn - spokenBefore.get(num);
    }
    spokenBefore.set(num, spokenTurn);
    return numNextToSpeak;
}
exports.addToSpokenBefore = addToSpokenBefore;
