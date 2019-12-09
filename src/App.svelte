<script>
import {moduleMassArray} from './consts/moduleMass'
import {testMassArray} from './consts/moduleMass'
import {calcTotalFuel} from './helpers/fuelCalcHelper'
import {getNumberOfOrbits, getNumberOfOrbitsFrom, getMinimalOrbitJumps} from './helpers/orbitsCalculator'

import {intCodeTestArray} from './consts/IntcodeInput'
import {intcodeInputArray} from './consts/IntcodeInput'
import {desiredOutput} from './consts/IntcodeInput'
// import {executeProgram, executeThrusters,findBestAmpCombination} from './helpers/IntcodeComputer'
// import {findDesiredValues} from './helpers/IntcodeComputer'
import WireBoard from './WireBoard.svelte'
import PassWord from './PassWord.svelte'
import {cutInputToLayers} from './helpers/elfImageProccessor'
import {imageInput} from './consts/imageInput'
import {IntcodeComputer} from './helpers/IntcodeComputer'
const compA = new IntcodeComputer({    compId : 'compA',
    initialMemoryArray: intcodeInputArray,
    requestInput: ()=> 1,
    sendOutput: outPut=>console.log('output compA', outPut)
});
debugger;
compA.executeProgram();



//let combinationsRes = findBestAmpCombination(intcodeInputArray)
</script>

<!-- <h1>input: {intCodeTestArray}!</h1> -->
<!-- <h1>You should use {calcTotalFuel(moduleMassArray)} fuel to run all your modules!</h1>
<h1>You should use {calcTotalFuel(testMassArray)} fuel to run all your modules!</h1> -->
<!-- <h1>intCode Output: {executeProgram(intcodeInputArray)}</h1> -->
<!-- <h1>intCode Output: {combinationsRes.highestOutput} with {combinationsRes.bestCombination}</h1> -->
<!-- <h1>intCode Output: {executeThrusters([9,8,7,6,5],intcodeInputArray)}</h1> -->
<!-- <h1> values for: {desiredOutput} {values.noun} {values.verb}</h1> -->
<!-- <WireBoard></WireBoard>
<PassWord></PassWord> -->

<!-- <h1>Number of orbits: {getNumberOfOrbits()}</h1> -->
<!-- <h1>Number of orbits: {getNumberOfOrbitsFrom('SAN')}</h1>
<h1>Number of orbits: {getNumberOfOrbitsFrom('YOU')}</h1>
<h1>Number of orbit jumps from you to santa: {getMinimalOrbitJumps('YOU','SAN')}</h1> -->
<!-- <h1>layerProccessing: {cutInputToLayers(imageInput,25,6)}</h1> -->
<h1> Hi!</h1>
