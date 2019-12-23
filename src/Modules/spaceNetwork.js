import { IntcodeComputer } from "../helpers/IntcodeComputer";


export function executeNetwork(connectedNumber,intCodeArray){

    let intcodeOutput = 0
    let halted = new Array(connectedNumber);
    halted.fill(false);
    let outputPrep = new Array(300);
    let messageQueue = new Array(300);
    outputPrep.fill();
    messageQueue.fill();
    function getInput(index){
      if(!messageQueue[index] || messageQueue[index].length === 0){
        //console.log(index, ' requested but no value to give returning -1')
        return -1;
      } else {
        let res = messageQueue[index].pop()
        console.log(index, ' requested  returning ', res)
        return res;
      }
    }
    function logHalted(index){
      debugger;
      halted[index] = true;
    }
    function queueOutput(index,value){
      if(outputPrep[index] === undefined) outputPrep[index] = [];
      switch(outputPrep[index].length){
        case 0:
          if(value === 255){
            debugger;
          }
        case 1:
          outputPrep[index].push(value);
          break;
        case 2:
          outputPrep[index].push(value);
          sendAndDiscard(outputPrep[index]);
      }
    }

    function sendAndDiscard(messageArray){
      let to = messageArray[0];
      let x = messageArray[1];
      let y = messageArray[2];
      if(messageQueue[to] === undefined) messageQueue[to] = [];

      messageQueue[to].unshift(x);
      messageQueue[to].unshift(y);
      messageArray = [];
    }

    let computers = new Array(connectedNumber);
    for (var index = 0 ; index < 50 ; index++){
      computers[index] = new IntcodeComputer({
        debug: '',
        compId : 'comp-' + index,
        initialMemoryArray: intCodeArray.slice(0),
        waitForRestartAfterEachStep: true,
        informHalted: ()=>{
          logHalted(index);
          },
        requestInput: (function() {
          var executed = false;
          let getNewInput = getInput;
          return function() {
              if (!executed) {
                  executed = true;
                  return index;
              } else return getNewInput(index);
          };
          })(),
        sendOutput: outPut=>{
          console.log('output from:',index, outPut);
          queueOutput(index,outPut);
        }
    })
    }

    
    //while (!(ampAhalted)){// && ampBhalted && ampChalted && ampDhalted && ampEhalted)) {
      let count = 0;
      while (count < 100000 && halted.some(element => element === false)) {
        for (var index = 0 ; index < 50 ; index++){
          computers[index].executeProgram();
        }
        count++
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', count)
      }
        // console.log('status:',ampAhalted,ampBhalted,ampChalted,ampDhalted,ampEhalted)
      // }
    }
