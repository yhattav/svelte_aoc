import { IntcodeComputer } from "../helpers/IntcodeComputer";
import {intcodeInputArray} from '../consts/IntcodeInput'

export function executeDroid(intCodeArray){

    let brainOutput = 0;
    let brainStatus = false;
    let testbounds = 5000;
    let arrayX = 50;
    let arrayY= 50;
    let row = new Array(arrayX);
    row.fill(' ');
    let panel = new Array(arrayY).fill([]);
    panel = panel.map(element=>
      row.slice(0)
      )
    let position = [21,21];
    console.warn('executing droid, starting panel:', panel);
    let paintPositionLog = []
    let directionLog = []
    let reversing = false;
    let currentDirection;
    let moved = false;
    let treeLengthLog =[];
    paint('.');

    function paint(value,paintPosition = position){
      // //console.log('painting' ,value, paintPosition)
      panel[paintPosition[0]][paintPosition[1]] = value;
      paintPositionLog.push(paintPosition);
      //TODO check if painted twice? or wall twice - because then he is stupid.
    }


    function paintWallHit(){
      let wallPosition = [];
      switch (directionLog[directionLog.length-1]){
        case 1:
          wallPosition = [position[0]-1,position[1]]
          break;
        case 2:
          wallPosition = [position[0]+1,position[1]]
          break;
        case 3:
          wallPosition = [position[0],position[1]-1]
          break;
        case 4:
          wallPosition = [position[0],position[1]+1]
          break;
      }
      paint('#', wallPosition);
    }

    function move(){
      // moved = true
      let nextPosition = [];
      switch (currentDirection){
        case 1:
          nextPosition = [position[0]-1,position[1]]
          break;
        case 2:
          nextPosition = [position[0]+1,position[1]]
          break;
        case 3:
          nextPosition = [position[0],position[1]-1]
          break;
        case 4:
          nextPosition = [position[0],position[1]+1]
          break;
      }
      //console.log('changing posisiton to :', nextPosition)
      position = nextPosition;
    }

    function operateOnOutput(value){
      try{
        if(position[1] >= arrayX || position[0] >= arrayY || position[1] < 0 || position[0] < 0){
          console.error('going out of boundries')
        }
      }catch (e){
        debugger;
        // //console.log(position,e)
      }



      //console.log('output', value);
      switch(value){
        case 0:
            // hit wall, not moving
            paintWallHit();
            //should remove last direction from log
            directionLog.pop()
            //
            return;
        case 1:
            // moved.
            move();
            paint('.');
            break;
            case 2:
              move();
              paint('W');
              console.warn('>>>>>>>>>>>>>>>>>>>>>>>> found!!!!!', directionLog.length);
            break;
      }


      brainOutput = value;
    }

    function getInput(){
      //if(position[0]===5 && position[1]=== 3) debugger;
      let unexploredPossibilities;
      let nextDirection;
      //get current posiiton.
      let currentPosition = position.slice(0);
      //get possible uxplored places array (in direction)
      unexploredPossibilities = getPossibleUnexploredDirections(currentPosition);
      //if there are: 
      if(unexploredPossibilities.length > 0){
        // choose the first available unexplored direction
        reversing = false;
        nextDirection = unexploredPossibilities[0];
      } else {
        
        nextDirection = reverse(directionLog[directionLog.length-1]);
        reversing = true;
        //step back.
      }
      //console.log('giving next direction', nextDirection, reversing, unexploredPossibilities);
      !reversing && directionLog.push(nextDirection);
      reversing && directionLog.pop();
      currentDirection = nextDirection;
      return nextDirection;
    }

    function reverse(direction) {
      switch (direction){
        case 1:
          return 2;
        case 2:
          return 1;
        case 3:
          return 4;
        case 4:
          return 3;
      }
    }

    function getPossibleUnexploredDirections(position){
      let x = position[1];
      let y = position[0];
      let possibilitiesArray = []
      if(panel[y-1][x] === ' ') {
        possibilitiesArray.push(1);
      }
      if(panel[y+1][x] === ' ') {
        possibilitiesArray.push(2);
      }
      if(panel[y][x-1] === ' ') {
        possibilitiesArray.push(3);
      }
      if(panel[y][x+1] === ' ') {
        possibilitiesArray.push(4);
      }
      return possibilitiesArray

    }
    function finndPossiblePositionsToSpread(position){
      let x = position[1];
      let y = position[0];
      let possibilitiesArray = []
      if(panel[y-1][x] === '.') {
        possibilitiesArray.push([y-1,x]);
      }
      if(panel[y+1][x] === '.') {
        possibilitiesArray.push([y+1,x]);
      }
      if(panel[y][x-1] === '.') {
        possibilitiesArray.push([y,x-1]);
      }
      if(panel[y][x+1] === '.') {
        possibilitiesArray.push([y,x+1]);
      }
      return possibilitiesArray

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

      // //console.log(panel);
      // //console.log(paintPositionLog);
      // console.warn('>>>>>>>>>>>', uniqueLength(paintPositionLog.slice(0)))
      console.warn(brainOutput);
      //[9, 5]
      function findFillingTime(position,board,step){
        let possibilities;
        //do
        // fill this point with air
        paint('O',position);
        // find possible places to spread

        possibilities = finndPossiblePositionsToSpread(position);

        if(possibilities.length<=0){
          treeLengthLog.push(step);
          return;
        } else {
          // spread to them and find their filling time
          possibilities.forEach(element=>{
            findFillingTime(element,board,step+1);
          });
        }


      }
      let startingPosition = [9, 5];
      findFillingTime(startingPosition,panel.slice(0),0);
      console.log(treeLengthLog.sort((a,b)=> a-b));
      console.warn(treeLengthLog.pop())
      return panel;
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
      // //console.log(index);
      let countArray = [];
      let lastRemoved=[''];
      let current;
      do{
        current = array[index];
        if(!arraysEqual(current,lastRemoved)){
          lastRemoved = array.splice(index,1)[0];
          countArray.push(lastRemoved);
        } else {
          // //console.log('skipping one');
          index++;
        }
    
      } while (array.length>index)
    
      // //console.log(countArray);
      console.warn(countArray.length);
      return(countArray.length)
    
    }