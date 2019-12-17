import { IntcodeComputer } from "../helpers/IntcodeComputer";
import {intcodeInputArray} from '../consts/IntcodeInput'

export function executeVacume(intCodeArray){
  
  let brainOutput = 0;
  let brainStatus = false;
  let testbounds = 20000;
  let arrayX = 10;
  let arrayY= 4000;
  let row = new Array(arrayX);
  row.fill(' ');
  let panel = new Array(arrayY).fill([]);
  let inputIndex = 0;
  panel = panel.map(element=>
    row.slice(0)
    )
    let position = [0,0];
    let aFunc = ['L',',','6',',','L',',','4',',','R',',','1','2']
    let bFunc = ['L',',','6',',','R',',','1','2',',','R',',','1','2',',','L',',','8']
    let cFunc = ['L',',','6',',','L',',','1','0',',','L',',','1','0',',','L',',','6']
    let funcArray = ['A',',','B',',','A',',','C',',','B',',','A',',','C',',','B',',','A',',','C']
    
    let inputArray = createInputArray();
    console.warn('executing droid, starting panel:', panel);
    let paintPositionLog = []
    //let intersectionsLog =[];
    paint('.');

    function paint(value,paintPosition = position){
      // //console.log('painting' ,value, paintPosition)
      panel[paintPosition[0]][paintPosition[1]] = String.fromCharCode(value);
      paintPositionLog.push(paintPosition);
    }

    function newLine(){
      position = [position[0]+1,0]
    }
    function stepPosition(){
      position = [position[0],position[1]+1];
    }

    function operateOnOutput(value){
      console.log('output', value);
      switch(value){
        case 35: // #
            paint(value);
            stepPosition();
            return;
        case 46: // .
            paint(value);
            stepPosition();
            // moved.
            break;
        case 10: // New Line
            newLine();
            break;
        case 60:
        case 62:
        case 94:
        case 86:
            paint(value);
            break;
            default:
              paint(value);
          console.warn('couldnt find output match in ASCII normal code')
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
    const brain =  new IntcodeComputer({
                    compId : 'ampA',
                    initialMemoryArray: intCodeArray.slice(0),
                    requestInput: (function() {
                      var executed = false;
                      return function() {
                          if (!executed) {
                              executed = true;
                              return getInput();
                          } else return getInput();
                      };
                    })(),
                    sendOutput: outPut=>{
                    // //console.log('output droid', outPut);
                    operateOnOutput(outPut);
                  }})
      let index = 0
      while ((!(brainStatus)) && index<testbounds) {
        index ++;
        brainStatus = brain.executeProgram().halted;
      }
      debugger;
      console.log(panel);
      // //console.log(paintPositionLog);
      // console.warn('>>>>>>>>>>>', uniqueLength(paintPositionLog.slice(0)))
      console.warn(brainOutput);
      
      debugger;
      return panel;
      
      function createInputArray (){
        let res = []
        funcArray.forEach(element=>{
          res.push(element.charCodeAt(0))
        })
        res.push(10);
        aFunc.forEach(element=>{
          res.push(element.charCodeAt(0))
        })
        res.push(10);
        bFunc.forEach(element=>{
          res.push(element.charCodeAt(0))
        })
        res.push(10);
        cFunc.forEach(element=>{
          res.push(element.charCodeAt(0))
        })
        res.push(10);
        res.push(110);
        res.push(10);
        console.log(res) 
        return res;       
      }
      
      // let startingPosition = [2, 44];
      // findFillingTime(startingPosition,panel.slice(0),0);
      // let reduced = 0;
      // intersectionsLog.map(element=>{
      //   reduced += element[0]*element[1]
      // });
      // debugger;
      // console.warn(reduced)
      // debugger;


      // function findFillingTime(position,board,step){
      //   let possibilities;
      //   //do
      //   // fill this point with air
      //   paint('O',position);
      //   // find possible places to spread
      //   possibilities = finndPossiblePositionsToSpread(position);
      //   if(possibilities.length > 1){

      //   intersectionsLog.push(position);
      //   }
        
      //   if(possibilities.length<=0){
      //     return;
      //   } else {
      //     // spread to them and find their filling time
      //     possibilities.forEach(element=>{
      //       findFillingTime(element,board,step+1);
      //     });
      //   }


      // }






      // function finndPossiblePositionsToSpread(position){
      //   let x = position[1];
      //   let y = position[0];
      //   let possibilitiesArray = []
      //   if(panel[y-1] && panel[y-1][x] === '#') {
      //     possibilitiesArray.push([y-1,x]);
      //   }
      //   if(panel[y+1]  && panel[y+1][x] === '#') {
      //     possibilitiesArray.push([y+1,x]);
      //   }
      //   if(panel[y][x-1] === '#') {
      //     possibilitiesArray.push([y,x-1]);
      //   }
      //   if(panel[y][x+1] === '#') {
      //     possibilitiesArray.push([y,x+1]);
      //   }
      //   return possibilitiesArray
  
      // }
    }
