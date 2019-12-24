import { IntcodeComputer } from "../helpers/IntcodeComputer";

export function drawTractor(intCodeArray,startingPosition, X, Y){

    let brainOutput = 0;
    let brainStatus = false;
    let testbounds = X*Y;
    let arrayX = X;
    let arrayY= Y;
    let row = new Array(arrayX);
    let pulledCount = 0;
    row.fill(' ');
    let panel = new Array(arrayY).fill([]);
    panel = panel.map(element=>
      row.slice(0)
      )
    let position = [0,0];
    console.warn('executing droid, starting panel:', panel);
    let paintPositionLog = []

    let treeLengthLog =[[0,0]];
    paint('.');

    function paint(value,paintPosition = position){
      // //console.log('painting' ,value, paintPosition)
      panel[paintPosition[0]][paintPosition[1]] = value;
      paintPositionLog.push(paintPosition);
      //TODO check if painted twice? or wall twice - because then he is stupid.
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
            paint('.')
            return;
        case 1:
            pulledCount++;
            paint('#');
            treeLengthLog.push(position.slice(0))
            newLine();
            if(position[1] >= arrayX || position[0] >= arrayY || position[1] < 0 || position[0] < 0) {
              testbounds = 0;
            }
            break;
      }
      brainOutput = value;
    }
    function moveX(){
      position[1]++;
    }
    function newLine(){
      position[0]++
      position[1]=treeLengthLog[treeLengthLog.length-1][1] - 2 < 0 ? 0 : treeLengthLog[treeLengthLog.length-1][1] - 2;
    }
    let count = 0;
    let toggleXY = true

    function getInput() {
      let res;
      if(count !== 0){
      if(toggleXY) { 
        if(position[1]===X-1){
        newLine();
      } else {
        moveX();
      }
    }
    }
    
      if(toggleXY) {
        res =  position[1]+startingPosition[1];
      } else {
        count++;
        res =  position[0]+startingPosition[0];
        console.log(position);
      }
      toggleXY = !toggleXY
      return res
    }
    
    const brain =  new IntcodeComputer({
      debug: '',
      compId : 'comp',
      initialMemoryArray: intCodeArray.slice(0),
      waitForRestartAfterEachStep: false,
      requestInput: (function() {
        var executed = false;
        let getNewInput = getInput;
        return function() {
            if (!executed) {
                executed = true;
                return getNewInput();
            } else return getNewInput();
        };
        })(),
      sendOutput: outPut=>{
        console.log('output:', outPut);
        operateOnOutput(outPut);
      }
  })
      let index = 0
      for (var i = 0 ; i < testbounds ; i++) {
        while ((!(brainStatus))) {
          index ++;
          console.log(index)
          brainStatus = brain.executeProgram().halted;
        }
        brain.reset();
        brainStatus = false;
      }
      // for (var j = 0 ; j<2000 ;j++){
      //   console.warn(calcBeamSize(j),j)
      // }
      // //console.log(panel);
      // //console.log(paintPositionLog);
      // console.warn('>>>>>>>>>>>', uniqueLength(paintPositionLog.slice(0)))
      console.warn(pulledCount);
      
      //[9, 5]
      // function findFillingTime(position,board,step){
        //   let possibilities;
        //   //do
        //   // fill this point with air
        //   paint('O',position);
        //   // find possible places to spread
        
      //   possibilities = finndPossiblePositionsToSpread(position);
      
      //   if(possibilities.length<=0){
        //     treeLengthLog.push(step);
        //     return;
        //   } else {
          //     // spread to them and find their filling time
          //     possibilities.forEach(element=>{
            //       findFillingTime(element,board,step+1);
            //     });
            //   }
            
            
            // }
            // let startingPosition = [9, 5];
            // findFillingTime(startingPosition,panel.slice(0),0);
            // console.log(treeLengthLog.sort((a,b)=> a-b));
            // console.warn(treeLengthLog.pop())
            console.warn(treeLengthLog)
            let answer = testArray(intCodeArray,treeLengthLog,100)
            debugger;
            return panel;
          }
export function testArray(intCodeArray,array,cubeSize){

    let brainStatus = false;

    function operateOnOutput(value,position){
      
      if(value === 1){
        console.warn(position);
        console.warn([position[0]-(cubeSize-1),position[1]]);
        debugger;
      } else {
        console.log('.');
      }
    }

    array.map(element=>{
      if (element[0]>=cubeSize){
        console.log(element, 'testing: ',element[0]-(cubeSize-1), element[1]+cubeSize-1)
        const brain =  new IntcodeComputer({
                                            debug: '',
                                            compId : 'comp',
                                            initialMemoryArray: intCodeArray.slice(0),
                                            waitForRestartAfterEachStep: false,
                                            requestInput: (function() {
                                              var executed = false;
                                              return function() {
                                                  if (!executed) {
                                                      executed = true;
                                                      return element[1]+cubeSize-1;
                                                  } else return element[0]-(cubeSize-1);
                                              };
                                            })(),
                                            sendOutput: outPut=>{
                                              console.log('output:', outPut);
                                              operateOnOutput(outPut,element);
                                            }
                                        });
                                        
           brain.executeProgram().halted;
      
    }
    });
      

  }
          

