
export 	function executeProgram(intcodeArray) {
  let intcodeOutput = intcodeArray;
  let exitCode;
  let instruction;
  let index = 0;
do {   
    const instructionLength = getInstructionLength(intcodeArray[index]);
      instruction = intcodeOutput.slice(index,index+instructionLength);
      exitCode = executeInstruction(instruction, intcodeOutput);
      if (!exitCode) {
        console.warn('returning from program on index: ', index, ' value was:', intcodeArray[index]);
        return intcodeOutput;
      }
      index+=instructionLength;
    
  } while (exitCode);
  console.log(intcodeOutput);
  return intcodeOutput;
}

function executeInstruction(instructionArray, array){
  const command = instructionArray[0];
  const AIndex = instructionArray[1];
  const BIndex = instructionArray[2];
  const outputIndex = instructionArray[3];
  let res = undefined;

  switch (command) {
    case 1:
      res = array[AIndex] + array[BIndex];
      break;
    case 2:
      res = array[AIndex] *  array[BIndex];
      break;
    case 99:
    default:
      console.warn('exiting with code 0');
  }
  if(res) {array[outputIndex] = res};
  return res ? 1 : 0;
}

function getInstructionLength(optCode) {
  switch (optCode) {
    case 1:
    case 2:
      return 4;
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