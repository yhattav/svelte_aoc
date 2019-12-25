import { IntcodeComputer } from "../helpers/IntcodeComputer";

export function executeQuestDroid(brain,command){
    debugger;
    let pointer = 0;
    let brainOutput = 0;
    let brainStatus = false;
    let arrayY= 1;
    let panel = new Array(arrayY).fill(' ');
    let inputIndex = 0;
    let position = [0,0];
    let toASCIIArray = [command];

    let inputArray = createASCIIInputArrayFromArray(toASCIIArray);

    function paint(value,paintPosition = position){
      // //console.log('painting' ,value, paintPosition)
      panel[paintPosition[0]] = panel[paintPosition[0]] ? panel[paintPosition[0]] + String.fromCharCode(value) : '' + String.fromCharCode(value);
    }

    function newLine(){
      position = [position[0]+1,0]
    }
    function stepPosition(){
      position = [position[0],position[1]+1];
    }

    function operateOnOutput(value){
      console.log('output', value, String.fromCharCode(value));
      switch(value){
        case 10: // New Line
            pointer++;
            newLine();
            break;
        // case 32: // New Line
        // break;
        default:
          paint(value);
          stepPosition();
        }
      brainOutput = value;
    }

    function getInput(){
      let input = inputArray[inputIndex];
      inputIndex++;
      if(input === undefined) console.warn('input undefined');
      console.log('inputing: ', input);
      return input;
    }

    let index = 0
    while (!brainStatus) {
      index ++;
      brainStatus = brain.executeProgram().halted;
      if (brainOutput ==='?'.charCodeAt(0)) {
        brainStatus = true;
      }
    }
      
    function createASCIIInputArrayFromArray (toASCIIArray){
      let res = []
      toASCIIArray.forEach(line=>{
        for (var i = 0; i < line.length; i++) {
          res.push(line.charAt(i).charCodeAt(0));
        }
        res.push(10);
      });
      console.log(res) 
      return res;       
    }
    console.log(panel)
    debugger;
    return panel;
    }
