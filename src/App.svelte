<script>
import {moduleMassArray} from './consts/moduleMass'
import {testMassArray} from './consts/moduleMass'
import {calcTotalFuel} from './helpers/fuelCalcHelper'

import {intCodeTestArray} from './consts/IntcodeInput'
import {intcodeInputArray} from './consts/IntcodeInput'
import {desiredOutput} from './consts/IntcodeInput'
import {executeProgram} from './helpers/IntcodeComputer'
import {findDesiredValues} from './helpers/IntcodeComputer'
import WireBoard from './WireBoard.svelte'
	// let name = 'world';
	// function calcModuleFuel(moduleMass) {
  //   return Math.floor(moduleMass / 3) - 2;
  // }
  
  // function calcTotalFuel(massArray) {
  //   const reducer = (accumulator, currentValue) => accumulator + calcModuleFuel(currentValue);
  //   return massArray.reduce(reducer);
  // }
  //let values = findDesiredValues(desiredOutput, intcodeInputArray);
</script>

<!-- <h1>input: {intCodeTestArray}!</h1> -->
<!-- <h1>You should use {calcTotalFuel(moduleMassArray)} fuel to run all your modules!</h1>
<h1>You should use {calcTotalFuel(testMassArray)} fuel to run all your modules!</h1> -->
<!-- <h1>intCode Output: {executeProgram(intcodeInputArray)}</h1>
<h1> values for: {desiredOutput} {values.noun} {values.verb}</h1> -->
<WireBoard name="lsdlds"></WireBoard>