"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var bootComputer_1 = __importDefault(require("./bootComputer"));
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    // Part 1
    var bootComputer = new bootComputer_1.default(input);
    // console.log(bootComputer.start());
    // Part 2
    var bruteForceFixedInputs = helpers_1.bruteForceFixInputs(input);
    bruteForceFixedInputs.forEach(function (fixedInput) {
        var bootComputer = new bootComputer_1.default(fixedInput);
        console.log(bootComputer.start());
    });
    // Hier dan iets van een forEach om te kijken of hij werkt.
}
advent();
