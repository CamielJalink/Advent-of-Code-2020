"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BootComputer = /** @class */ (function () {
    function BootComputer(instructions) {
        this.pointer = 0;
        this.instructions = [];
        this.accumulator = 0;
        this.isRunning = true;
        this.visitedPointers = [0];
        this.instructions = instructions.map(function (instructionRaw) {
            var instruction = instructionRaw.split(' ');
            instruction[1] = Number(instruction[1]);
            return instruction;
        });
    }
    BootComputer.prototype.start = function () {
        while (this.isRunning) {
            var instr = this.instructions[this.pointer];
            this.visitedPointers.push(this.pointer);
            switch (instr[0]) {
                case 'nop':
                    this.nop();
                    break;
                case 'acc':
                    this.acc(instr[1]);
                    break;
                case 'jmp':
                    this.jmp(instr[1]);
                    break;
                default:
                    console.error("instruction not recognized!");
                    this.isRunning = false;
                    break;
            }
            // After the pointer is updated, we now check if this pointer has already been visited before
            if (this.visitedPointers.includes(this.pointer)) {
                // console.log("allready visited pointer: " + this.pointer);
                this.isRunning = false;
            }
            // if the pointer is pointing at the first index outside of the scope of instructions,
            // than the program has finished running correctly.
            if (this.pointer === this.instructions.length) {
                console.log("Program ended correctly");
                this.isRunning = false;
            }
        }
        return this.accumulator;
    };
    BootComputer.prototype.nop = function () {
        this.pointer++;
    };
    BootComputer.prototype.acc = function (arg) {
        this.accumulator += arg;
        this.pointer++;
    };
    BootComputer.prototype.jmp = function (arg) {
        this.pointer += arg;
    };
    return BootComputer;
}());
exports.default = BootComputer;
