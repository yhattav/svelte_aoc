import { IntcodeComputer } from "../helpers/IntcodeComputer";


export function executeNetwork(connectedNumber,intCodeArray){

    let intcodeOutput = 0
    let halted = new Array(connectedNumber);
    halted.fill(false);
    let outputPrep = new Array(connectedNumber);
    let messageQueue = new Array(connectedNumber);
    let lastOutputTime = Infinity;
    let lastInputforEachComputer = new Array(connectedNumber)
    outputPrep.fill();
    messageQueue.fill();
    function areAllQueuesEmpty(){
      let res = true;
      for (var i ; i< connectedNumber ; i++) {
        if(messageQueue[i] && messageQueue[i].length>0){
          res = false;
          break;
        }
      }
      return res;
    }

    function getInput(index){
      if(!messageQueue[index] || messageQueue[index].length === 0){
        // console.log(index, ' requested but no value to give returning -1')
        //console.log(index, ' requested  returning ', -1)
        lastInputforEachComputer[index] = false;
        return -1;
      } else {
        let res = messageQueue[index].pop()
        // console.log(index, ' requested  returning ', res)
        lastInputforEachComputer[index] = true;

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
        case 1:
          outputPrep[index].push(value);
          break;
        case 2:
          outputPrep[index].push(value);
          sendAndDiscard(index);
      }
      lastOutputTime = count;
      // console.log({lastOutputTime})
    }

    function sendAndDiscard(index){
      let to = outputPrep[index][0];
      let x = outputPrep[index][1];
      let y = outputPrep[index][2];

      if(messageQueue[to] === undefined) messageQueue[to] = [];
      if(to === 255) {
        let newNAT = []
        newNAT.unshift(x);
        newNAT.unshift(y);
        messageQueue[to] = newNAT.slice();
      } else {
        messageQueue[to].unshift(x);
        messageQueue[to].unshift(y);
      }
      outputPrep[index] = [];
    }

    let computers = new Array(connectedNumber);
    for (var index = 0 ; index < 50 ; index++) {
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
          // console.log('output from:',index, outPut);
          queueOutput(index,outPut);
        }
    })
    }

    function isLastOutPutOld(){
      // console.log(lastInputforEachComputer)
      return lastOutputTime<count && !lastInputforEachComputer.some(element => element === true);
    }
    
    //while (!(ampAhalted)){// && ampBhalted && ampChalted && ampDhalted && ampEhalted)) {
      let count = 0;
      let networkIdle = false;
      let lastNatYValue
      while (count < 200000 && halted.some(element => element === false)) {
        for (var index = 0 ; index < 50 ; index++){
          computers[index].executeProgram();
        }
        count++
        // console.log(messageQueue,outputPrep);

        //console.log(isLastOutPutOld(),areAllQueuesEmpty(),messageQueue[255] && messageQueue[255].length === 2,messageQueue[255])

        if(isLastOutPutOld() && areAllQueuesEmpty() && messageQueue[255] && messageQueue[255].length === 2){
          networkIdle = true;
        }

        if (networkIdle) {
          queueOutput(255,0);
          let x = getInput(255)
          let y = getInput(255)
          queueOutput(255,x)
          queueOutput(255,y)
          lastInputforEachComputer[255] = false
          if(y === lastNatYValue){
            console.warn(y);
            break;
          }
          lastNatYValue = y;
          // console.warn(lastNatYValue)
          networkIdle = false;
        }
      }
        // console.log('status:',ampAhalted,ampBhalted,ampChalted,ampDhalted,ampEhalted)
      // }
    }
