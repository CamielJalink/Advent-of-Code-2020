export default class BootComputer {
  pointer: number = 0;
  instructions: any[][] = [];
  accumulator: number = 0;
  isRunning: boolean = true;
  visitedPointers: number[] = [0];

  constructor(instructions: string[]){
    this.instructions = instructions.map((instructionRaw: string) => {
      let instruction: any[] = instructionRaw.split(' ');
      instruction[1] = Number(instruction[1])
      return instruction;
    })
  }

  start(){
    while(this.isRunning){
      const instr: any[] = this.instructions[this.pointer];
      this.visitedPointers.push(this.pointer);       // Niet bij reference toch? Ook al is het een prop want number?

      switch (instr[0]){
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
      if(this.visitedPointers.includes(this.pointer)){
        console.log("allready visited pointer: " + this.pointer);
        this.isRunning = false;
      }
    }

    return this.accumulator;
  }

  nop(){
    this.pointer++;
  }

  acc(arg: number){
    this.accumulator += arg;
    this.pointer++;
  }

  jmp(arg: number){
    this.pointer += arg;
  }
}