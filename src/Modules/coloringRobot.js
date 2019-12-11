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



export function executeRobot(intCodeArray){

    let braiOutput = 0;
    let brainStatus = false;
    let rotation = 0;
    let arrayX = 200;
    let arrayY= 200;
    let row = new Array(arrayX);
    row.fill(' ');
    let panel = new Array(arrayY).fill([]);
    panel = panel.map(element=>
      row.slice(0)
      )
    let position = [0,0];
    console.warn('executing Robot, starting panel:', panel);
    let shouldColorOrMove = 'color';
    let paintPositionLog = []
    
    paint(1);
    function changeRotation(value){
      
      if(value){
        console.log('rotating right', value, rotation)
        rotation++;
      } else {
        console.log('rotating left', value, rotation)
        rotation--;
      }
      if (rotation<0){
        console.log('negative rotation, normalizing', rotation, rotation+4);
        rotation+=4;
      }
    }
    function getDirection(){
      let normalizedRotation = rotation % 4;
      switch(normalizedRotation) {
        case 0:
          return [0,-1];
        case 1:
          return [1,0];
        case 2:
          return [0,1];
        case 3:
          return [-1,0];
      }
    }
    function stepForward(){
      let direction = getDirection();
      position = [position[0]+direction[1],position[1]+direction[0]];
      console.log('new position', position, direction)
    }
    function toggleColorMove(){
      if (shouldColorOrMove === 'color'){
        shouldColorOrMove = 'move';
      } else {
        shouldColorOrMove = 'color';
      }
    }
    function paint(value){
      console.log('painting' ,value, value === 0 ? ' ' : value === 1 ? '%' : undefined, position)
      panel[position[0]][position[1]] = value === 0 ? ' ' : value === 1 ? '%' : undefined;
      paintPositionLog.push(position);
    }

    function operateOnOutput(value){
      switch(shouldColorOrMove){
        case 'color':
            paint(value);
            break;
        case 'move':
            changeRotation(value);
            stepForward();
            break;
      }
      toggleColorMove();
      braiOutput = value;
    }

    function getCurrentColor(){
      try{
      if(position[1] >= arrayX || position[0] >= arrayY || position[1] < 0 || position[0] < 0){
        console.error('going out of boundries')
      }
      console.log(panel[position[0]][position[1]])
      if(panel[position[0]][position[1]] === '%'){
        console.log('returning white!');
        return 1;
      } else {
        return 0;
      }
    }catch (e){
      debugger;
      console.log(position,e)
    }
    }
    const brain =  new IntcodeComputer({
                    compId : 'ampA',
                    initialMemoryArray: intCodeArray.slice(0),
                    requestInput: (function() {
                      var executed = false;
                      return function() {
                          if (!executed) {
                              executed = true;
                              return getCurrentColor();
                          } else return getCurrentColor();
                      };
                    })(),
                    sendOutput: outPut=>{
                    console.log('output ampA', outPut);
                    operateOnOutput(outPut);
                  }})

      while (!(brainStatus)) {
        brainStatus = brain.executeProgram().halted;
      }
      console.log(panel);
      console.log(paintPositionLog);
      console.warn('>>>>>>>>>>>', uniqueLength(paintPositionLog.slice(0)))
      console.warn(braiOutput)
      return braiOutput
    }

    function countUnique(array) {
      // return new Set(iterable).size;
      (array).sort( (a,b) => {
        if (a[0]-b[0])
        { return (a[0]-b[0]);
        } else {
          return (a[1]-b[1]);
        }
      });
      let last = [undefined,undefined]
      let index = 0;
      do {
        if(arraysEqual(array[index], last)){
          index++;
        } else {
          array.coordinatesArray.splice(index,1)
        }
      } while(index<array.length)
    }

    function arraysEqual(a, b) {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length != b.length) return false;
    
      // If you don't care about the order of the elements inside
      // the array, you should sort both arrays here.
      // Please note that calling sort on an array will modify that array.
      // you might want to clone your array first.
    
      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }


    export function uniqueLength(array) {
      (array).sort( (a,b) => {
        if (a[0]-b[0])
        { return (a[0]-b[0]);
        } else {
          return (a[1]-b[1]);
        }
      });
      
      debugger;
      let index = 0;
      console.log(index);
      let countArray = [];
      let lastRemoved=[''];
      let current;
      do{
        current = array[index];
        if(!arraysEqual(current,lastRemoved)){
          lastRemoved = array.splice(index,1)[0];
          countArray.push(lastRemoved);
        } else {
          console.log('skipping one');
          index++;
        }
    
      } while (array.length>index)
    
      console.log(countArray);
      console.warn(countArray.length);
      return(countArray.length)
    
    }