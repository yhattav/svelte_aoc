import { IntcodeComputer } from "../helpers/IntcodeComputer";

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

// export function executeAmps(combination = [5,6,7,8,9], intCodeArray) {

// let sendOutputA = new Promise((resolve) =>{
//   resolve(combination[0]);
// }).then(()=>{
//   sendOutputA = new Promise(resolve=>resolve());
// });
// let sendOutputB = new Promise((resolve) =>{
//   resolve(combination[1]);
// }).then(()=>{
//   sendOutputB = new Promise(resolve=>resolve());
// });

//   const ampA = new IntcodeComputer({
//     compId : 'amp-A',
//     initialMemoryArray: intCodeArray,
//     requestInput: async ()=>{
//       let input = await sendOutputB;
//       return input;
//     },
//     sendOutput: outPut=> { sendOutputA.resolve(outPut); console.log('output compA', outPut); sendOutputA = new Promise;}
//   })
//   const ampB = new IntcodeComputer({
//     compId : 'amp-B',
//     initialMemoryArray: intCodeArray,
//     requestInput: async ()=>{
//       let input = await sendOutputA;
//       return input;
//     },
//     sendOutput: outPut=> { sendOutputB.resolve(outPut); console.log('output compB', outPut); sendOutputB = new Promise;}
//   })

//   ampA.executeProgram();
//   ampB.executeProgram();
//   const ampC = new IntcodeComputer({
//     compId : 'amp-C',
//     initialMemoryArray: intCodeArray,
//     requestInput: ()=> 1,
//     sendOutput: outPut=>console.log('output compC', outPut)
//     })
//   const ampD = new IntcodeComputer({
//     compId : 'amp-D',
//     initialMemoryArray: intCodeArray,
//     requestInput: ()=> 1,
//     sendOutput: outPut=>console.log('output compD', outPut)
//     })
//   const ampE = new IntcodeComputer({
//     compId : 'amp-E',
//     initialMemoryArray: intCodeArray,
//     requestInput: ()=> 1,
//     sendOutput: outPut=>console.log('output compE', outPut)
//     })

  
// }
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
          } else return;
      };
    })());//,()=>combination[i]);
    lastAnswer = programeRes.outputMessage;
    console.warn(index + 1,' answer was', lastAnswer)
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
    res = executeAmps(element,intCodeArray);
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



export function executeAmps(combination = [5,6,7,8,9],intCodeArray){

    let intcodeOutput = 0
    let ampAhalted = false
    let ampBhalted = false
    let ampChalted = false
    let ampDhalted = false
    let ampEhalted = false
    function getLastOutput(){
      return intcodeOutput;
    }
    function putLastOutput(value){
      intcodeOutput = value;
    }
    const amps = {
                  ampA : new IntcodeComputer({
                    compId : 'ampA',
                    initialMemoryArray: intCodeArray.slice(0),
                    requestInput: (function() {
                      var executed = false;
                      let intCodeOutput = getLastOutput;
                      return function() {
                          if (!executed) {
                              executed = true;
                              return Number(combination[0]);
                          } else return intCodeOutput();
                      };
                    })(),
                    sendOutput: outPut=>{
                    console.log('output ampA', outPut);
                    putLastOutput(outPut);
                  }}),
                  ampB : new IntcodeComputer({
                    compId : 'ampB',
                    initialMemoryArray: intCodeArray.slice(0),
                    requestInput: (function() {
                      var executed = false;
                      let intCodeOutput = getLastOutput;

                      return function() {
                          if (!executed) {
                              executed = true;
                              return Number(combination[1]);
                          } else return intCodeOutput();
                      };
                    })(),
                    sendOutput: outPut=>{
                      console.log('output ampB', outPut);
                      putLastOutput(outPut);
                  }}),
                  ampC : new IntcodeComputer({
                    compId : 'ampC',
                    initialMemoryArray: intCodeArray.slice(0),
                    requestInput: (function() {
                      var executed = false;
                      let intCodeOutput = getLastOutput;

                      return function() {
                          if (!executed) {
                              executed = true;
                              return Number(combination[2]);
                          } else return intCodeOutput();
                      };
                    })(),
                    sendOutput: outPut=>{
                      console.log('output ampC', outPut);
                      putLastOutput(outPut);
                  }}),
                  ampD : new IntcodeComputer({
                    compId : 'ampD',
                    initialMemoryArray: intCodeArray.slice(0),
                    requestInput: (function() {
                      var executed = false;
                      let intCodeOutput = getLastOutput;

                      return function() {
                          if (!executed) {
                              executed = true;
                              return Number(combination[3]);
                          } else return intCodeOutput();
                      };
                    })(),
                    sendOutput: outPut=>{
                      console.log('output ampD', outPut);
                      putLastOutput(outPut);
                  }}),
                  ampE : new IntcodeComputer({
                    compId : 'ampE',
                    initialMemoryArray: intCodeArray.slice(0),
                    requestInput: (function() {
                      var executed = false;
                      let intCodeOutput = getLastOutput;


                      return function() {
                          if (!executed) {
                              executed = true;
                              return Number(combination[4]);
                          } else return intCodeOutput();
                      };
                    })(),
                    sendOutput: outPut=>{
                      console.log('output ampE', outPut);
                      putLastOutput(outPut);
                  }}),
      }



      //while (!(ampAhalted)){// && ampBhalted && ampChalted && ampDhalted && ampEhalted)) {
      while (!(ampAhalted && ampBhalted && ampChalted && ampDhalted && ampEhalted)) {
        ampAhalted = amps.ampA.executeProgram().halted;
        ampBhalted = amps.ampB.executeProgram().halted;
        ampChalted = amps.ampC.executeProgram().halted;
        ampDhalted = amps.ampD.executeProgram().halted;
        ampEhalted = amps.ampE.executeProgram().halted;
        console.log('status:',ampAhalted,ampBhalted,ampChalted,ampDhalted,ampEhalted)
      }

      console.warn(intcodeOutput)
      return intcodeOutput
    }
