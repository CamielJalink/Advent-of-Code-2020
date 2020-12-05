"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMySeatId = exports.findFreeSeats = exports.findNumber = void 0;
function findNumber(code) {
    var lowerBound = 0;
    var upperBound = Math.pow(2, code.length) - 1; // 8 for seats, 128 for rows.
    for (var i = 0; i < code.length; i++) {
        var relevantArea = upperBound - lowerBound + 1;
        if (code[i] === 'L' || code[i] === 'F') { // F and L are the lower halves
            upperBound = upperBound - (relevantArea / 2);
        }
        else {
            lowerBound = lowerBound + (relevantArea / 2);
        }
    }
    return lowerBound; // lowerbound and upperbound are now the same number
}
exports.findNumber = findNumber;
function findFreeSeats(seatsTaken) {
    var freeSeats = [];
    for (var row = 0; row < 128; row++) {
        for (var seat = 0; seat < 8; seat++) {
            if (seatsTaken[row][seat] !== 'x') {
                freeSeats.push(row * 8 + seat);
            }
        }
    }
    return freeSeats;
}
exports.findFreeSeats = findFreeSeats;
function findMySeatId(freeSeats) {
    var mySeatId = 0;
    // sort available seats based on seatId
    freeSeats.sort(function (seatIdA, seatIdB) {
        if (seatIdA < seatIdB) {
            return -1;
        }
        else {
            return 1;
        }
    });
    // Since we know we are not in the back on in the front of the plane, 
    // we know that the seats next to us are taken and therefor NOT in the freeSeats array.
    for (var i = 1; i < freeSeats.length - 1; i++) {
        var seat = freeSeats[i];
        var prevSeat = freeSeats[i - 1];
        var nextSeat = freeSeats[i + 1];
        // The seats next to ours would have an id of 1 greater or less than ours
        if (Math.abs(seat - prevSeat) !== 1 && Math.abs(seat - nextSeat) !== 1) {
            mySeatId = seat;
        }
    }
    return mySeatId;
}
exports.findMySeatId = findMySeatId;
