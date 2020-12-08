export function bruteForceFixInputs(input: string[]){
  let fixedInputs: string[][] = [];

  for(let i = 0; i < input.length; i++){
    let instr = input[i].split(" ");

    if(instr[0] === "jmp" || instr[0] === "nop"){
      let manipulatedInstr = "";

      if(instr[0] === "jmp"){
        manipulatedInstr = "nop " + instr[1]; // flip jmp to nop but keep the argument
      }
      else{
        manipulatedInstr = "jmp " + instr[1]; // flip nop to jmp but keep the argument
      }
      
      let inputVariant: string[] = JSON.parse(JSON.stringify(input)); // Make a deep copy of the input;
      inputVariant[i] = manipulatedInstr;
      fixedInputs.push(inputVariant);
    }
  }

  return fixedInputs;
}