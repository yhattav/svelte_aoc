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
import PassWord from './PassWord.svelte'


</script>

<!-- <h1>input: {intCodeTestArray}!</h1> -->
<!-- <h1>You should use {calcTotalFuel(moduleMassArray)} fuel to run all your modules!</h1>
<h1>You should use {calcTotalFuel(testMassArray)} fuel to run all your modules!</h1> -->
<!-- <h1>intCode Output: {executeProgram(intcodeInputArray)}</h1>
<h1> values for: {desiredOutput} {values.noun} {values.verb}</h1> -->
<WireBoard></WireBoard>
<PassWord></PassWord>