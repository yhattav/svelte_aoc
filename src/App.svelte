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
import {cutInputToLayers,printImage} from './helpers/elfImageProccessor'
import {imageInput} from './consts/imageInput'
import {IntcodeComputer} from './helpers/IntcodeComputer'
import {executeAmps,findBestAmpCombination} from './Modules/IntcodeModule'
import {findBestLocation,findNthToBeVaporized} from './helpers/asteroidsCalculator'
import {executeRobot} from './Modules/coloringRobot'
// const compA = new IntcodeComputer({    compId : 'compA',
//     initialMemoryArray: intcodeInputArray,
//     requestInput: ()=> 1,
//     sendOutput: outPut=>console.log('output compA', outPut)
// });
// compA.executeProgram();


// let image = printImage(imageInput,25,6);
// let combinationsRes = findBestAmpCombination(intcodeInputArray)
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
<!-- <h1> Hi! {executeAmps([9,8,7,6,5], intcodeInputArray)}</h1> -->
<!-- <h1>Day 10 {findBestLocation().highestLocation}</h1> -->
<!-- <h1>Day 10 {findNthToBeVaporized()}</h1> -->
<!-- {image.lineA}<br>
{image.lineB}<br>
{image.lineC}<br>
{image.lineD}<br>
{image.lineE}<br>
{image.lineF}<br> -->
<h1>{executeRobot(intcodeInputArray)}</h1>