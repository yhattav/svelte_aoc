import { IntcodeComputer } from "../helpers/IntcodeComputer";

export function createPanel(intCodeArray,updateBoard){

    let braiOutput = 0;
    let brainStatus = false;
    let rotation = 0;
    let arrayX = 40;
    let arrayY= 26;
    let row = new Array(arrayX);
    row.fill(' ');
    let panel = new Array(arrayY).fill([]);
    let joystickPlacements = new Array (500).fill(0);
    let lastBallPosition = [21,18];
    let paddlePosition = [24,20];
    let ballDirection
    let ballAngle = 45;
    let joystickCommand;
    let gameStarted = false;
    // joystickPlacements.unshift(-1);
    // joystickPlacements.unshift(-1);
    // joystickPlacements.unshift(-1);
    // joystickPlacements.unshift(-1);
    // joystickPlacements.unshift(-1);
    // joystickPlacements.unshift(-1);

  let score = 0;
  let joystickIndex = 0;
    panel = panel.map(element=>
      row.slice(0)
      )
    let position = [0,0];
    console.warn(' starting panel:', panel);
    let paintPositionLog = []
    let index = 0

    function calcHitplace(lastBallPos,ballPosition){
      let angle = Math.atan2((ballPosition[1]-lastBallPos[1]), (ballPosition[0]-lastBallPos[0])) * 180 / Math.PI;
      ballAngle = angle ? angle : ballAngle;
      if(ballAngle > 0 && ballAngle < 90) {
        console.log('right,down')
        ballDirection = 1;
      }
      if(ballAngle > 90 && ballAngle < 180) {
        console.log('right,up')
        ballDirection = 2;
      }
      if(ballAngle > -180 && ballAngle < -90) {
        console.log('left,up')
        ballDirection = 3;
      }
      if(ballAngle > -90 && ballAngle < 0) {
        console.log('right,down')
        ballDirection = 4;
      }

      let delta = ballPosition[1] - paddlePosition[1]; // - ball is on the left , 0 ball on top , + ball on the right
      let ballHeight = 24 - ballPosition[0];
      let heightDelta = ballHeight - Math.abs(delta);
      if (ballHeight === 1 && (ballDirection === 1 || ballDirection === 4)){ // going down and next is hit (height 1);
        if ((ballDirection === 1 || ballDirection === 2)){ // is going to hit from the left
          if(delta < 0) joystickCommand = -1; // will change direction to the left
          else if(delta >= 0) joystickCommand = 1; // will keep direction
        }
        if ((ballDirection === 3 || ballDirection === 4)){ // is going to hit from the right
          if(delta <= 0) joystickCommand = -1; // will keep direction
          else if(delta > 0) joystickCommand = 1; // should change to the right.
        }
      } else {
      if(delta < 0 && (ballDirection === 1 || ballDirection === 2)){ // ball is left and coming right
        if(heightDelta > 0) joystickCommand = 1; // should catch up to the right
        if(heightDelta === 0) joystickCommand = 0;
        if(heightDelta < 0) joystickCommand = -1;
      }
      else if (delta>=0 && (ballDirection === 1 || ballDirection === 2)){ // ball is on the right or top and going right
        joystickCommand = 1;
      }
      else if (delta <= 0 && (ballDirection === 3 || ballDirection === 4)) { // ball is on the left or top and going left
        joystickCommand = -1;
      }
      else if (delta > 0 && (ballDirection === 3 || ballDirection === 4)){ // ball is on the right and going left
        if(heightDelta > 0) joystickCommand = -1; // should catch up to the right
        if(heightDelta === 0) joystickCommand = 0;
        if(heightDelta < 0) joystickCommand = 1;
      }
    }

      console.warn('looks like we need to go:', joystickCommand);
    }
    function paint(value){
      if(value === 4) {
        calcHitplace(lastBallPosition, position);
        lastBallPosition = position.slice(0);
      }
      if(value === 3) {
        paddlePosition = position.slice(0);
      }
      console.log('painting' ,value, position)
      panel[position[0]][position[1]] = value;
      paintPositionLog.push(position);
      gameStarted && updateBoard(panel);
    }
    function printScore(value){
      gameStarted = true;
      console.warn('Score' ,value)
      score = value;
    }

    function operateOnOutput(value){
      switch(index%3){
        case 0:
          position[1] = value;
          break;
        case 1:
          position[0] = value;
          break;
        case 2:
          if(position[0] === 0 && position[1] ===-1){
            printScore(value)
          }else {
            paint(value);
          }
          break;
        default:
      }
      index++;
    }

    function getJoystickPosition(){
      // if(joystickIndex>=joystickPlacements.length){
      //   console.log(panel)
      //   debugger;
      // }
      // let value =  joystickPlacements[joystickIndex];
      // joystickIndex++;
      // return value

      console.log('giving command:', joystickCommand);
      return joystickCommand;
    }
    const brain =  new IntcodeComputer({
                    compId : 'gamecode',
                    initialMemoryArray: intCodeArray.slice(0),
                    requestInput: (function() {
                      var executed = false;
                      return function() {
                          if (!executed) {
                              executed = true;
                              return getJoystickPosition();
                          } else return getJoystickPosition();
                      };
                    })(),
                    sendOutput: outPut=>{
                    operateOnOutput(outPut);
                  }})

      while (!(brainStatus)) {
        brainStatus = brain.executeProgram().halted;
      }
      console.warn(findNumberInPanel(2,panel));
      console.warn('>>>>>>>>>>>',panel)
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

    function findNumberInPanel(value,panel){
      let count = 0;
      panel.forEach(element=>{
        element.forEach(element=>{
          if(element === value){
            count++;
          }
        })
      });
      return count;
    }