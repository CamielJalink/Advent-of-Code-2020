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
        console.log(this.instructions);
    }
    BootComputer.prototype.start = function () {
        while (this.isRunning) {
            var instr = this.instructions[this.pointer];
            this.visitedPointers.push(this.pointer); // Niet bij reference toch? Ook al is het een prop want number?
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
            // Hier is de pointer al geupdate, en kunnen we checken of we de volgende willen aanpakken.
            if (this.visitedPointers.includes(this.pointer)) {
                console.log("allready visited pointer: " + this.pointer);
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
// Een class BootComputer
// Property accumulator
// Methods voor Nop, Acc en Jmp
// Die moeten de pointer aanpassen. 
// Property pointer?
// array 'memory' oid, waar we de hele input in kunnen zetten. 
// Method 'start' die hem aftrapt. 
// Array visitedPointers, waar we alleen de pointer aan toevoegen als hij er nog niet in zit. 
// (Set?)
// Start de computer met z'n method. 
// Deze start method heeft een while loop waardoor hij eindeloos de volgende stappen kan doen: 
// Als de pointer NIET al in de visitedPointers staat:
// Die method roept de juiste method aan afhankelijk van de input[pointer]  (nop, acc, jmp);
// Methods passen mogelijk de Acc aan, en passen de pointer aan. 
// Methods nop, acc en jmp hoeven niets te returnen, ze passen direct de properties aan.
