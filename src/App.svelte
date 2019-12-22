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
import {executeDroid} from './Modules/repairDroid'
import {executeSpringDroid} from './Modules/springDroid'
import {executeVacume} from './Modules/ASCII'
import {positionsObjectsArray} from './consts/moonsInput'
import {runMoons} from './Modules/JupiterMoons'
import {createPanel} from './Modules/gamePanel'
import {chemistryArray,chemistryDigest,chemistryOutcomes,chemistryIngrediants} from './consts/chemistryInput'
import {oreToFuel} from './Modules/chemistryCalculator'
import {fftInput,fftPattern,fftPatternArray,fftcrazyInput,crazy} from './consts/fftInput'
import {runFFT} from './helpers/fft'
//import {solveMaze,fillDeadEnds} from './Modules/mazeRunnerB'
import {solveMaze,fillDeadEnds} from './Modules/mazeRunnerC'
import {mazeArray} from './consts/mazeInput'
import {shuffle,extremeShuffle} from './Modules/shuffler'
// const compA = new IntcodeComputer({    compId : 'compA',
//     initialMemoryArray: intcodeInputArray,
//     requestInput: ()=> 1,
//     sendOutput: outPut=>console.log('output compA', outPut)
// });
// compA.executeProgram();
// let board = mazeArray;
// let digestedBoard = fillDeadEnds(mazeArray,[40,40]);
// let panel =[[]]
// $: board = panel;
// async function updateBoard(panel) {
//     board = panel;
// }
//let board = executeSpringDroid(intcodeInputArray)
// console.log(chemistryIngrediants)
// console.log(chemistryOutcomes)
// console.log(chemistryArray)
// console.log(chemistryDigest)
// let image = printImage(imageInput,25,6);
// let combinationsRes = findBestAmpCombination(intcodeInputArray)
// console.log('app',positionsObjectsArray)
// let energy = runMoons(50,positionsObjectsArray);
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
<!-- <h1>{executeDroid(intcodeInputArray)}</h1> -->
<!-- <h1>{executeSpringDroid(intcodeInputArray)}</h1> -->
<!-- <h1>{createPanel(intcodeInputArray,updateBoard)}</h1> -->
<!-- <h1>{energy}</h1> -->
<!-- <div class="board">
	{#each board as row,index}
		<div class ="row row-{index}">
            {#each row as tile}
                <div class="tile tile-{tile}">{tile}</div>
            {/each}
        </div>>
	{/each}
</div> -->
<!-- <div class="board">
	{#each digestedBoard as row,index}
		<div class ="row row-{index}">
            {#each row as tile}
                <div class="tile tile-{tile}">{tile}</div>
            {/each}
        </div>>
	{/each}
</div> -->
<!-- <h1>{oreToFuel()}</h1> -->
<!-- <h1>{runFFT(fftcrazyInput,fftPatternArray,100)}</h1> -->
<!-- <h1>{solveMaze(mazeArray,[40,40],26)}</h1> -->
<!-- <h1>{solveMaze(mazeArray,[3,3],26)}</h1> -->
<!-- <h1>{solveMaze(mazeArray,[3,6],7)}</h1> -->
<!-- <h1>{solveMaze(mazeArray,[1,5],7)}</h1> -->
<!-- <h1>{solveMaze(mazeArray,[1,1],9)}</h1> -->
<!-- <h1>{solveMaze(mazeArray,[4,8],16)}</h1> -->
<!-- <h1>{solveMaze(mazeArray,[1,15],6)}</h1> -->
<!-- <h1>{shuffle(10007,1)}</h1> -->
<h1>{extremeShuffle(119315717514047,1000000,2020)}</h1>
<!-- <h1>{extremeShuffle(10,1,1)}</h1> -->




<style>
    .board {
        font-size: 20px;
        width: 2000px;
        height: 2000px;
        overflow-x: scroll;
        overflow-y: scroll;
        float: inline-end;
    }

    .tile{
        border:1px;
        border-color: black;
        width:15px;
        height:15px;
        float: left;
    }
    .tile-\#{
        background-color: rgb(221, 217, 217);
    }
    .tile-\.{
        background-color: burlywood;
    }
    .tile-{
        background-color: black;
    }
    .tile-3{
        background-color: greenyellow;
    }
</style>