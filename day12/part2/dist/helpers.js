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
        this.x = 0;
        this.y = 0;
        this.wpX = 10;
        this.wpY = 1;
    }
    Ferry.prototype.goNorth = function (amount) {
        this.wpY += amount;
    };
    Ferry.prototype.goSouth = function (amount) {
        this.wpY -= amount;
    };
    Ferry.prototype.goEast = function (amount) {
        this.wpX += amount;
    };
    Ferry.prototype.goWest = function (amount) {
        this.wpX -= amount;
    };
    // Action L means to rotate the waypoint around the ship left(counter - clockwise) the given number of degrees.  
    Ferry.prototype.goLeft = function (amount) {
        var numberOfturns = amount / 90; // 1, 2 or 3
        for (var i = 0; i < numberOfturns; i++) {
            this.turnLeft();
        }
    };
    Ferry.prototype.turnLeft = function () {
        var currWpX = this.wpX;
        var currWpY = this.wpY;
        this.wpX = -1 * currWpY;
        this.wpY = currWpX;
    };
    Ferry.prototype.goRight = function (amount) {
        var numberOfturns = amount / 90; // 1, 2 or 3
        for (var i = 0; i < numberOfturns; i++) {
            this.turnRight();
        }
    };
    Ferry.prototype.turnRight = function () {
        var currWpX = this.wpX;
        var currWpY = this.wpY;
        this.wpX = currWpY;
        this.wpY = -1 * currWpX;
    };
    Ferry.prototype.goForward = function (amount) {
        // console.log("Before adding amount: " + this.x + "," + this.y)
        // console.log("amount is: " + amount);
        // console.log("Before adding amount, waypoint is now at " + this.wpX + "," + this.wpY);
        this.x = this.x + (amount * this.wpX);
        this.y = this.y + (amount * this.wpY);
        // console.log("After this step, ship is now at: " + this.x + "," + this.y);
        // console.log("After this step, waypoint is now at " + this.wpX + "," + this.wpY);
    };
    return Ferry;
}());
exports.Ferry = Ferry;
