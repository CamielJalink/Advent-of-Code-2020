"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    var currentTime = Number(input[0]);
    var stringBusses = input[1].split(",");
    var busses = [];
    for (var i = 0; i < stringBusses.length; i++) {
        if (!isNaN(Number(stringBusses[i]))) {
            busses.push(Number(stringBusses[i]));
        }
    }
    findEarliestBusDeparture(currentTime, busses);
}
// 939
// 7, 13, 59, 31, 19
function findEarliestBusDeparture(currentTime, busses) {
    var nextBusDepartureInMinutes = findEarliestDeparture(currentTime, busses[0]);
    var nextBus = busses[0];
    busses.forEach(function (bus) {
        var busNextDeparture = findEarliestDeparture(currentTime, bus);
        if (busNextDeparture < nextBusDepartureInMinutes) {
            nextBusDepartureInMinutes = busNextDeparture;
            nextBus = bus;
        }
    });
    console.log(nextBus * nextBusDepartureInMinutes);
}
function findEarliestDeparture(currentTime, busTravelTime) {
    var busIteration = 0;
    while (currentTime > busIteration) {
        busIteration += busTravelTime;
    }
    return busIteration - currentTime;
}
advent();
