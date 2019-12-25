<script>
import {IntcodeComputer} from './helpers/IntcodeComputer'
// import {executeQuestDroid} from './Modules/questDroid'
import QuestLog from './QuestLog.svelte';
import {intcodeInputArray} from './consts/IntcodeInput'


const brain = new IntcodeComputer({
                compId : 'ampA',
                debug: '',
                initialMemoryArray: intcodeInputArray.slice(0),
                waitForRestartAfterEachStep: false,
                informHalted: ()=>{
                console.log('halted');
                },
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
                operateOnOutput(outPut);
            }});
let board;
let command;
let executedCommand = ''
let firstCommands = 'east,take mouse,north,north,take spool of cat6,north,take hypercube,east,south,take antenna,north,take sand,west,south,west,north,south,east,south,south,south,south,north,south,west,south,take astronaut ice cream,north,north,inv'
let pointer = 0;
let brainOutput = 0;
let arrayY= 1;
let panel = new Array(arrayY).fill(' ');
let inputIndex = 0;
let position = [0,0];
let inputArray;
let commandLog= [];
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

function executeQuestDroid(brain,command){
  debugger;
    let toASCIIArray = [command];
    let brainStatus = false;
    inputIndex = 0;
    inputArray = createASCIIInputArrayFromArray(toASCIIArray);
    let index = 0
    while (!brainStatus) {
        index ++;
        brainStatus = brain.executeProgram().halted;
        if (brainOutput ==='?'.charCodeAt(0)) {
            brainStatus = true;
        }
    }
      
  }

$: executeQuestDroid(brain,executedCommand)

function sendCommand(){
  newLine();
    panel[position[0]] = `-----${command}----`;
    commandLog.push(command);
    commandLog = commandLog;
    newLine();
    executedCommand = command;
    command ='';
}

function executeCommandSet(){
  let set = firstCommands.split(',');

  while (set.length>0){
    executeQuestDroid(brain, set.splice(0,1)[0])
  }

}

function handleKeydown(e){
  if (e.key === "Enter"){
  if(e.currentTarget.type==='text'){
    sendCommand();
  }
  }
}

</script>

<QuestLog board={panel}></QuestLog>
<input bind:value={command} on:keydown={handleKeydown}>
<button on:click={sendCommand}>Do as I command!</button>
<h3>{commandLog}</h3>
<button on:click={executeCommandSet}>execute Collect Command Set</button>

<style>
</style>
<!-- east,take mouse,north,north,take spool of cat6,north,take hypercube,east,south,take antenna,north,take sand,west,south,west,north,south,east,south,south,south,south,north,south,west,south,take astronaut ice cream,north,inv,north -->