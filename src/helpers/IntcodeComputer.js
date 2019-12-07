
export 	function executeProgram(intcodeArray) {
  let intcodeOutput = intcodeArray;
  let pointerCode;
  let instruction;
  let parameters;
  let index = 0;
  let code;
do {   
    const instructionCode = intcodeArray[index];
    code = parseInstructionCode(instructionCode);
    const instructionLength = code.length;
    parameters = intcodeOutput.slice(index+1,index+instructionLength)
      instruction = {
        code,
        parameters,
        index,
      };
      pointerCode = executeInstruction(instruction, intcodeOutput);
      if (!pointerCode) {
        console.warn('returning from program on index: ', index, ' value was:', intcodeArray[index]);
        return intcodeOutput;
      }
      if (typeof pointerCode === 'number') {
        console.log('jumpint to new index: ', pointerCode)
        index = pointerCode;
      } else {
        index+=instructionLength;
      }
    
  } while (pointerCode);
  console.log(intcodeOutput);
  return intcodeOutput;
}

function executeInstruction(instruction, array){
  const command = instruction.code.optCode;
  const paramA = instruction.parameters[0];
  const paramB = instruction.parameters[1];
  let outputIndex;
  let res = undefined;
  let instructionOutCode = undefined;

  const valueA = instruction.code.modeA ? paramA : array[paramA];
  const valueB = instruction.code.modeB ? paramB : array[paramB];

  switch (command) {
    case 1:
      res = valueA + valueB;
      outputIndex = instruction.parameters[2];
      console.log('with code 1, inputing:',valueA,'+',valueB,'=', res, 'into: ', outputIndex)
      array[outputIndex] = res
      instructionOutCode = true;
      break;
    case 2:
      res = valueA *  valueB;
      outputIndex = instruction.parameters[2];
      console.log('with code 2, inputing:',valueA,'*',valueB,'=', res, 'into: ', outputIndex)
      array[outputIndex] = res
      instructionOutCode = true;
      break;
    case 3:
      res = requestUserInput();
      outputIndex = instruction.parameters[0];
      console.log('with code 3, inputing:', res, 'into: ', outputIndex)
      array[outputIndex] = res
      instructionOutCode = true;
      break;
    case 4:
      console.warn('output requested with code 4 >>>>', valueA, array);
      instructionOutCode = true;
      break;
    case 5:
      if(valueA!== 0){
        instructionOutCode = valueB;
        console.log(' with code 5 >>>> jumping pointer to:', instructionOutCode, valueA );
      } else {
        instructionOutCode = true;
        console.log(' with code 5 >>>> nothing', valueA );
      }
      break;
    case 6:
      if(valueA === 0){
        instructionOutCode = valueB;
        console.log(' with code 6 >>>> jumping pointer to:', instructionOutCode, valueA );
      } else {
        instructionOutCode = true;
        console.log(' with code 6 >>>> nothing', valueA );
      }
      break;
    case 7:
      if(valueA < valueB){
        res = 1;
      } else {
        res = 0;
      }
        outputIndex = instruction.parameters[2];
        console.log('with code 7, inputing:', res, 'into: ', outputIndex)
        array[outputIndex] = res
        instructionOutCode = true;
        break;
    case 8:
      if(valueA === valueB){
        res = 1;
      } else {
        res = 0;
      }
        outputIndex = instruction.parameters[2];
        console.log('with code 7, inputing:', res, 'into: ', outputIndex)
        array[outputIndex] = res
        instructionOutCode = true;
        break;
    case 99:
    default:
      instructionOutCode = false
      console.warn('>>>>>>>>>>>>>> halting program');
  }
  return instructionOutCode;
}

function getInstructionLength(optCode) {
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
      return 2;
    case 99:
      return 1;
  }
}

export function findDesiredValues(desiredOutput, memoryArray) {
  let noun;
  let verb;
  let res;
  let newArray;
  for (noun = 0;noun<=99; noun++){
    for (verb = 0; verb<=99; verb++){
      newArray = memoryArray.slice();
      newArray[1] = noun;
      newArray[2] = verb;
      console.log('newArray', newArray);
      res = executeProgram(newArray)[0];
      if(res === desiredOutput){
        console.log('returning noun: ', noun, 'verb: ', verb);
        return {noun, verb};
      }
    }
  }
}

function parseInstructionCode(instructionCode) {
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
  length = getInstructionLength(optCode);
  console.log(instructionCode, {
    optCode,
    modeA,
    modeB,
    modeC,
    length,
  });
  return {
    optCode,
    modeA,
    modeB,
    modeC,
    length,
  }


}

function requestUserInput() {
  const input = 5;
  console.log('User inputs: ', input)
  return input;
}