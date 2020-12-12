"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ferry = exports.parseCommands = void 0;
function parseCommands(stringCommands) {
    var commands = [];
    stringCommands.forEach(function (stringCommand) {
        var command = {
            direction: stringCommand[0],
            argument: Number(stringCommand.substring(1))
        };
        commands.push(command);
    });
    return commands;
}
exports.parseCommands = parseCommands;
var Ferry = /** @class */ (function () {
    function Ferry() {
        this.direction = 'E';
        this.x = 0;
        this.y = 0;
    }
    Ferry.prototype.goNorth = function (amount) {
        this.y += amount;
    };
    Ferry.prototype.goSouth = function (amount) {
        this.y -= amount;
    };
    Ferry.prototype.goEast = function (amount) {
        this.x += amount;
    };
    Ferry.prototype.goWest = function (amount) {
        this.x -= amount;
    };
    Ferry.prototype.goLeft = function (amount) {
        var numberOfturns = amount / 90; // 1, 2 or 3
        for (var i = 0; i < numberOfturns; i++) {
            this.turnLeft();
        }
    };
    Ferry.prototype.turnLeft = function () {
        switch (this.direction) {
            case 'N':
                this.direction = 'W';
                break;
            case 'S':
                this.direction = 'E';
                break;
            case 'W':
                this.direction = 'S';
                break;
            case 'E':
                this.direction = 'N';
                break;
            default:
                throw new Error('that is not a valid value for this.direction');
        }
    };
    Ferry.prototype.goRight = function (amount) {
        var numberOfturns = amount / 90; // 1, 2 or 3
        for (var i = 0; i < numberOfturns; i++) {
            this.turnRight();
        }
    };
    Ferry.prototype.turnRight = function () {
        switch (this.direction) {
            case 'N':
                this.direction = 'E';
                break;
            case 'S':
                this.direction = 'W';
                break;
            case 'W':
                this.direction = 'N';
                break;
            case 'E':
                this.direction = 'S';
                break;
            default:
                throw new Error('that is not a valid value for this.direction');
        }
    };
    Ferry.prototype.goForward = function (amount) {
        switch (this.direction) {
            case 'N':
                this.goNorth(amount);
                break;
            case 'S':
                this.goSouth(amount);
                break;
            case 'E':
                this.goEast(amount);
                break;
            case 'W':
                this.goWest(amount);
                break;
            default:
                throw new Error('go forward is attempted without a valid direction in "this.direction"');
        }
    };
    return Ferry;
}());
exports.Ferry = Ferry;
