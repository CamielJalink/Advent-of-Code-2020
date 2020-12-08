"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bruteForceFixInputs = void 0;
function bruteForceFixInputs(input) {
    var fixedInputs = [];
    for (var i = 0; i < input.length; i++) {
        var instr = input[i].split(" ");
        if (instr[0] === "jmp" || instr[0] === "nop") {
            var manipulatedInstr = "";
            if (instr[0] === "jmp") {
                manipulatedInstr = "nop " + instr[1]; // flip jmp to nop but keep the argument
            }
            else {
                manipulatedInstr = "jmp " + instr[1]; // flip nop to jmp but keep the argument
            }
            var inputVariant = JSON.parse(JSON.stringify(input)); // Make a deep copy of the input;
            inputVariant[i] = manipulatedInstr;
            fixedInputs.push(inputVariant);
        }
    }
    return fixedInputs;
}
exports.bruteForceFixInputs = bruteForceFixInputs;
// Insanely brute force zou zijn: 
// Probeer allerlei varianten van de input te maken, 
// waarbij je van elke nop en jmp een keer het programma draait met die andersom.
