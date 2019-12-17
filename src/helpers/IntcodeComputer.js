
export class IntcodeComputer {

  constructor(config) {
    this.compId = config.compId;
    this.memory = config.initialMemoryArray;
    this.requestInputCB = config.requestInput;
    this.sendOutputCB = config.sendOutput;
    this.defaultValue = 0;
    this.pointer = config.pointer || 0;
    this.relativeBase = 0;
  }

  getValueAt(index){
    if (index < 0) {
      console.warn('compId:', this.compId, ' ', 'trying to get from memory at invalid index', index);
      return null;
    } else if(index >= this.memory.length) {
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
    const instructionCode = this.getValueAt(index);
    const code = this.parseInstructionCode(instructionCode);
    const length = code.length;
    const parameters = this.memory.slice(index+1,index+length)
    return {
      code,
      parameters,
      length,
    };
  }

  executeProgram() {
    // console.log('compId:', this.compId, ' ', '>>>>>>>>> Executing Program', this.memory)
    let instructionOutCode;
    let instruction;
  do {   
        instruction = this.getInstructionAt(this.pointer);
        instructionOutCode = this.executeInstruction(instruction);
        // console.log(instructionOutCode);
      } while (instructionOutCode);
      // console.log('compId:', this.compId, ' ', 'waiting after output')
      // console.warn('compId:', this.compId, ' ', 'returning from programe on pointer: ', this.pointer, ' last optCode was:', instruction.code.optCode);
      const returnObject = {intcodeOutput: this.memory, halted: instruction.code.optCode === 99 ? true : false};
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
        //console.log('case mode 2 getting value at:', param+this.relativeBase,param,this.relativeBase)
        value = this.getValueAt(param+this.relativeBase);
        //console.log(value)
        break;
    }     
    return value;
  }

  outputIndexByMode(mode,param){
    let index;
    switch (mode) {
      case 0:
        index = param;
        break;
      case 2:
        index = param+this.relativeBase;
        break;
    }     
    return index;
  }

  executeInstruction(instruction) {
    // console.log('executing:', instruction.code);
    // console.log('with parameters: ', instruction.parameters)
    const command = instruction.code.optCode;
    const paramA = instruction.parameters[0];
    const paramB = instruction.parameters[1];
    const paramC = instruction.parameters[2];
    let outputIndex;
    let res = undefined;
    let instructionOutCode = false;
  
    const valueA = this.getValueByMode(instruction.code.modeA, paramA);
    const valueB = this.getValueByMode(instruction.code.modeB, paramB);
    const valueC = this.getValueByMode(instruction.code.modeC,paramC);
    const outputIndexA = this.outputIndexByMode(instruction.code.modeA, paramA);
    const outputIndexB = this.outputIndexByMode(instruction.code.modeB, paramB);
    const outputIndexC = this.outputIndexByMode(instruction.code.modeC, paramC);
    switch (command) {
      case 1:
        res = valueA + valueB;
        outputIndex = outputIndexC;
        //console.log(outputIndexC)
        // console.log('compId:', this.compId, ' ', 'with code 1, inputing:',valueA,'+',valueB,'=', res, 'into: ', outputIndex)
        this.setValueAt(res,outputIndex);
        this.pointer += instruction.length;
        instructionOutCode = true;
        break;
      case 2:
        res = valueA *  valueB;
        outputIndex = outputIndexC;
        // console.log('compId:', this.compId, ' ', 'with code 2, inputing:',valueA,'*',valueB,'=', res, 'into: ', outputIndex)
        this.setValueAt(res,outputIndex);
        this.pointer += instruction.length;
        instructionOutCode = true;
        break;
      case 3:
        res = this.requestInput();
        outputIndex = outputIndexA;
        // console.log('compId:', this.compId, ' ', 'with code 3, inputing:', res, 'into: ', outputIndex, paramA, instruction.code.modeA)
        this.setValueAt(res,outputIndex);
        this.pointer += instruction.length;
        instructionOutCode = true;
        break;
      case 4:
        // console.warn('compId:', this.compId, ' ', 'output requested with code 4 >>>>', valueA, this.memory);
        this.sendOutput(valueA);
        this.pointer += instruction.length;
        instructionOutCode = false;
        break;
      case 5:
        if(valueA!== 0){
          this.pointer = valueB;
          // console.log('compId:', this.compId, ' ', ' with code 5 >>>> jumping pointer to:', instructionOutCode, valueA );
        } else {
          this.pointer += instruction.length;
          // console.log('compId:', this.compId, ' ', ' with code 5 >>>> nothing', valueA );
        }
        instructionOutCode = true;
        break;
      case 6:
        if(valueA === 0){
          this.pointer = valueB;
          // console.log('compId:', this.compId, ' ', ' with code 6 >>>> jumping pointer to:', instructionOutCode, valueA );
        } else {
          this.pointer += instruction.length;
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
          outputIndex = outputIndexC;
          // console.log('compId:', this.compId, ' ', 'with code 7, inputing:', res, 'into: ', outputIndex)
          this.setValueAt(res,outputIndex);
          this.pointer += instruction.length;
          instructionOutCode = true;
          break;
      case 8:
        if(valueA === valueB){
          res = 1;
        } else {
          res = 0;
        }
        outputIndex = outputIndexC;
        // console.log('compId:', this.compId, ' ', 'with code 8, inputing:', res, 'into: ', outputIndex)
        this.setValueAt(res,outputIndex);
        this.pointer += instruction.length;
        instructionOutCode = true;
        break;
      case 9:
        //console.warn('changingRELATIVE TO',this.relativeBase, valueA )
        this.relativeBase+=valueA;
        //console.warn('it is now:',this.relativeBase )
        this.pointer += instruction.length;
        instructionOutCode = true;
        break;
      case 99:
      default:
        //console.count('>>>>>>>>>>>>>> halting program');
        //console.warn('compId:', this.compId, ' ', '>>>>>>>>>>>>>> halting program');
        this.pointer += instruction.length;
        instructionOutCode = false
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
    
    optCode = Number(instructionCode[3]+instructionCode[4]);
    modeA = Number(instructionCode[2]);
    modeB = Number(instructionCode[1]);
    modeC = Number(instructionCode[0]);
    length = this.getInstructionLength(optCode);
    //console.log('compId:', this.compId, ' ', instructionCode);
    return {
      optCode,
      modeA,
      modeB,
      modeC,
      length,
    }
  }

  sendOutput (output){
    this.sendOutputCB(output);
  }

  requestInput(){
    const input = this.requestInputCB();
    return input;
  }
}
