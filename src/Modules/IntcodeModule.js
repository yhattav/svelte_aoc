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
      // console.log('newArray', newArray);
      res = executeProgram(newArray)[0];
      if(res === desiredOutput){
        // console.log('returning noun: ', noun, 'verb: ', verb);
        return {noun, verb};
      }
    }
  }
}

export function executeThrusters(combination= [0,1,2,3,4], intCodeArray) {
  console.log('EXECUTING THRUSTERS WITH COMB:', combination);
let ampSoftware = [intCodeArray.slice(0),intCodeArray.slice(0),intCodeArray.slice(0),intCodeArray.slice(0),intCodeArray.slice(0)]
let lastAnswer = 0;
let programeRes
let index = 0
  do {
    console.warn(index+1, 'THRUSTER AMP', 'combination: ',combination,'index: ',index,index%5)
    programeRes = executeProgram(ampSoftware[index%5],(function() {
      var executed = false;
      return function() {
          if (!executed) {
              executed = true;
              return Number(combination[index%5]);
          } else return lastAnswer;
      };
    })());//,()=>combination[i]);
    lastAnswer = programeRes.outputMessage;
    console.warn(index+1,' answer was', lastAnswer)
  } while (!programeRes.halted)
  return lastAnswer;
}

export function findBestAmpCombination(intCodeArray){
  const from = '56789'
  let permutations = getAllPermutations(from);
  let highestOutput = -Infinity;
  let bestCombination = [];
  let res;
  permutations.map((element)=>{
    res = executeThrusters(element,intCodeArray);
    // console.log('>>>>>>> Testing premutations: ', element, res)
    if(res > highestOutput){
      highestOutput = res;
      bestCombination = element;
    }
  });
  return {bestCombination,highestOutput};
}
function getAllPermutations(string) {
  var results = [];

  if (string.length === 1) {
    results.push(string);
    return results;
  }

  for (var i = 0; i < string.length; i++) {
    var firstChar = string[i];
    var charsLeft = string.substring(0, i) + string.substring(i + 1);
    var innerPermutations = getAllPermutations(charsLeft);
    for (var j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}