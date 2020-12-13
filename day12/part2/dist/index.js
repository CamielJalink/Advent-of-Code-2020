"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    var commands = helpers_1.parseCommands(input);
    findDestination(commands);
}
function findDestination(commands) {
    var ferry = new helpers_1.Ferry();
    commands.forEach(function (command) {
        switch (command.direction) {
            case 'N':
                ferry.goNorth(command.argument);
                break;
            case 'S':
                ferry.goSouth(command.argument);
                break;
            case 'E':
                ferry.goEast(command.argument);
                break;
            case 'W':
                ferry.goWest(command.argument);
                break;
            case 'L':
                ferry.goLeft(command.argument);
                break;
            case 'R':
                ferry.goRight(command.argument);
                break;
            case 'F':
                ferry.goForward(command.argument);
                break;
            default:
                throw new Error("This commands direction is illegal!");
                break;
        }
    });
    console.log("After these instructions, the ferry is at " + ferry.x + "," + ferry.y);
    var manhattenPosition = Math.abs(ferry.x) + Math.abs(ferry.y);
    console.log("Manhatten position", manhattenPosition);
}
advent();
