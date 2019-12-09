
export class IntcodeComputer {

  constructor(config) {
    this.compId = config.compId;
    this.memory = config.initialMemoryArray;
    this.requestInput = config.requestInput;
    this.sendOutput = config.sendOutput;
    this.defaultValue = 0;
    this.pointer = config.pointer || 0;
    this.relativeBase = 0;
  }

  getValueAt(index){
    if (index < 0) {
      console.warn('compId:', this.compId, ' ', 'trying to get from memory at invalid index', index);
      return null;
    } else if(this.memory[index] === undefined) {
      this.memory[index] = this.defaultValue;
    }
    return this.memory[index];
  }

  setValueAt(value,index){
    if (index < 0) {
      console.warn('compId:', this.compId, ' ', 'trying to get from memory at invalid index', index);
      return null;
    }
    if (typeof value !== 'number'){
      console.warn('compId:', this.compId, ' ', 'setting NaN value at: ', index, value);
    }
    this.memory[index] = value;
  }

  getInstructionAt(index){
    const instructionCode = this.memory[index];
    const code = this.parseInstructionCode(instructionCode);
    const length = code.length;
    const parameters = this.memory.slice(index+1,index+length)
    return {
      code,
      parameters,
      length,
    };
  }

  async executeProgram() {
    // console.log('compId:', this.compId, ' ', '>>>>>>>>> Executing Program', this.memory)
    let instructionOutCode;
    let instruction;
  do {   
        instruction = this.getInstructionAt(this.pointer);
        instructionOutCode = this.executeInstruction(instruction);

      } while (instructionOutCode);
      console.log('compId:', this.compId, ' ', 'THIS SHOULD BE ONLY AFTER 99')
      console.warn('compId:', this.compId, ' ', 'returning from programe on pointer: ', pointer, ' value was:', this.memory[pointer]);
      const returnObject = {intcodeOutput: this.memory, halted: true};
      return returnObject;
  }
  
  getValueByMode(mode,param){
    let value;
    switch (mode) {
      case 0:
        value = this.getValueAt(param)
        break;
      case 1:
        value = param;
        break;
      case 2:
        value = this,getValueAt(param+this.relativeBase);
        break;
    }     
    return value;
  }

  async executeInstruction(instruction) {
    const command = instruction.code.optCode;
    const paramA = instruction.parameters[0];
    const paramB = instruction.parameters[1];
    let outputIndex;
    let res = undefined;
    let instructionOutCode = false;
  
    const valueA = this.getValueByMode(instruction.code.modeA, paramA);
    const valueB = this.getValueByMode(instruction.code.modeB, paramB);
  
    switch (command) {
      case 1:
        res = valueA + valueB;
        outputIndex = instruction.parameters[2];
        // console.log('compId:', this.compId, ' ', 'with code 1, inputing:',valueA,'+',valueB,'=', res, 'into: ', outputIndex)
        this.setValueAt(res,outputIndex);
        this,pointer += instruction.length;
        instructionOutCode = true;
        break;
      case 2:
        res = valueA *  valueB;
        outputIndex = instruction.parameters[2];
        // console.log('compId:', this.compId, ' ', 'with code 2, inputing:',valueA,'*',valueB,'=', res, 'into: ', outputIndex)
        this.setValueAt(res,outputIndex);
        this,pointer += instruction.length;
        instructionOutCode = true;
        break;
      case 3:
        res = await this.requestInput();
        outputIndex = instruction.parameters[0];
        console.log('compId:', this.compId, ' ', 'with code 3, inputing:', res, 'into: ', outputIndex)
        this.setValueAt(res,outputIndex);
        this,pointer += instruction.length;
        instructionOutCode = true;
        break;
      case 4:
        console.warn('compId:', this.compId, ' ', 'output requested with code 4 >>>>', valueA, this.memory);
        this.sendOutput(valueA);
        this,pointer += instruction.length;
        instructionOutCode = true;
        break;
      case 5:
        if(valueA!== 0){
          this,pointer = valueB;
          // console.log('compId:', this.compId, ' ', ' with code 5 >>>> jumping pointer to:', instructionOutCode, valueA );
        } else {
          this,pointer += instruction.length;
          // console.log('compId:', this.compId, ' ', ' with code 5 >>>> nothing', valueA );
        }
        instructionOutCode = true;
        break;
      case 6:
        if(valueA === 0){
          this.pointer = valueB;
          // console.log('compId:', this.compId, ' ', ' with code 6 >>>> jumping pointer to:', instructionOutCode, valueA );
        } else {
          this,pointer += instruction.length;
          // console.log('compId:', this.compId, ' ', ' with code 6 >>>> nothing', valueA );
        }
        instructionOutCode = true;
        break;
      case 7:
        if(valueA < valueB){
          res = 1;
        } else {
          res = 0;
        }
          outputIndex = instruction.parameters[2];
          // console.log('compId:', this.compId, ' ', 'with code 7, inputing:', res, 'into: ', outputIndex)
          this.setValueAt(res,outputIndex);
          this,pointer += instruction.length;
          instructionOutCode = true;
          break;
      case 8:
        if(valueA === valueB){
          res = 1;
        } else {
          res = 0;
        }
          outputIndex = instruction.parameters[2];
          // console.log('compId:', this.compId, ' ', 'with code 8, inputing:', res, 'into: ', outputIndex)
          this.setValueAt(res,outputIndex);
          this,pointer += instruction.length;
          instructionOutCode = true;
          break;
      case 9:
          this.relativeBase+=valueA;
          this,pointer += instruction.length;
          instructionOutCode = true;
          break;
      case 99:
      default:
        console.count('>>>>>>>>>>>>>> halting program');
        console.warn('compId:', this.compId, ' ', '>>>>>>>>>>>>>> halting program');
        this,pointer += instruction.length;
        instructionOutCode = undefined
    }
    return instructionOutCode;
  }

  getInstructionLength(optCode) {
    switch (optCode) {
      case 1:
      case 2:
      case 7:
      case 8:
        return 4;
      case 5:
      case 6:
        return 3;
      case 3:
      case 4:
      case 9:
        return 2;
      case 99:
        return 1;
    }
  }

  parseInstructionCode(instructionCode) {
    let optCode;
    let modeA;
    let modeB;
    let modeC;
    let length;
    instructionCode = (''+(instructionCode*0.00001).toFixed(5)).split('.')[1];
    
    optCode = Number(instructionCode[3,4]);
    modeA = Number(instructionCode[2]);
    modeB = Number(instructionCode[1]);
    modeC = Number(instructionCode[0]);
    length = this.getInstructionLength(optCode);
    console.log('compId:', this.compId, ' ', instructionCode);
    return {
      optCode,
      modeA,
      modeB,
      modeC,
      length,
    }
  }
}
