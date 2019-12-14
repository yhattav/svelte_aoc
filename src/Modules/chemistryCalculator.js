import {chemistryOutcomes,chemistryIngrediants} from '../consts/chemistryInput'
import {ChemReaction} from '../helpers/chemReaction'
export class ChemCalculator {
  constructor(config){

    this.desiredOutput = config.desiredOutput;
    this.bank = {ORE: 1000000000000};
    this.outcomes = chemistryOutcomes;
    this.ingrediants = chemistryIngrediants;
    this.reactions = {}
    this.oreCount = 0;
    this.countOreFetchings = this.countOreFetchings.bind(this);

    this.createReactions();
  }

  countOreFetchings(value) {
    this.oreCount+= value;
  }
  updadeDesiredOutput(value) {
    this.desiredOutput = value;
  }
  createReactions() {
    let config;
    this.outcomes.forEach((element,index)=>{
      config = {
        output: element,
        input: this.ingrediants[index],
        CBForORE: this.countOreFetchings,
        isORE: false,
      }
      this.reactions[`${element[1]}`] = new ChemReaction(config);
      this.bank[`${element[1]}`] = 0
    })
    config = {
      output: ['1', 'ORE'],
      input: [[]],
      CBForORE: this.countOreFetchings,
      isORE: true,
    }
    this.reactions['ORE'] = new ChemReaction(config);
    
  }

  createOutput(){
    let desiredMaterial = this.desiredOutput[1];
    let desiredQuantity = Number(this.desiredOutput[0]); // TODO check for numbers are numbers everywhere...

    this.createMaterial(desiredMaterial,desiredQuantity);
  }
    
    
  
  createMaterial(desiredMaterial,desiredQuantity){
    let minima;
    if(desiredMaterial === 'ORE') {
      if((this.bank['ORE'] -= desiredQuantity < 0)) throw "CANT!!!";
      this.bank['ORE'] -= desiredQuantity
      this.countOreFetchings(desiredQuantity)
    } else {
    // while (this.bank[`${desiredMaterial}`] < desiredQuantity){
      minima = this.reactions[`${desiredMaterial}`].getMinima(desiredQuantity);
      while(!this.doesBankHaveMinima(minima)){
      minima.forEach(element=>{
        if((Number(element[0]) - this.bank[`${element[1]}`]) > 0) {
          this.createMaterial(element[1], Number(element[0]) - this.bank[`${element[1]}`]);
        }
      });
    }
    this.removeUseMinimaFromBank(minima);
    this.createAndBank(desiredMaterial,minima);
  }
    // }
  }
  
  doesBankHaveMinima(minima){
    let elementWithLess = false;
    elementWithLess = minima.find(element=>{
      return Number(element[0])>this.bank[`${element[1]}`];
    })
    return !elementWithLess;
  }

  removeUseMinimaFromBank(minima) {
    minima.forEach(element=>{
      this.bank[`${element[1]}`]-=Number(element[0]);
    });
  }

  createAndBank(desiredMaterial,minima){
    let output = this.reactions[`${desiredMaterial}`].create(minima)
    output.forEach(element=>{
      this.bank[`${element[0]}`]+=element[1]; //diff format:/
    })
  }
  
}


export function oreToFuel(){
  let numOfOre = 10;
  let chemCalc = new ChemCalculator({desiredOutput: ['10000', 'FUEL']})
  let desiredOutput;
  let index = 0;
  let letsGo = true;
  while (letsGo && (chemCalc.bank['ORE'] > 0)){
    try{
      desiredOutput = Math.floor(chemCalc.bank['ORE'] / 1000000);
      desiredOutput = desiredOutput < 1 ? 1 : desiredOutput
      chemCalc.updadeDesiredOutput([String(desiredOutput), 'FUEL']);
      chemCalc.createOutput();
      index++;
    } catch(e) {
      letsGo = false;
      console.warn('cant anymore', index, e)
    }
  }
  numOfOre = chemCalc.oreCount;
  let fuelCreated = chemCalc.bank['FUEL'];
  debugger;
  return fuelCreated;
}

function findReactionEquation() {
  this.input.forEach(element=>{
    inputIndex = input.findIndex(elem=> (elem[1] === element[1]))
    if(inputIndex<0 || (Number(input[inputIndex][0]) < Number(element[0]))) console.error('Cant Find Enough of The Right Ingrediant!!!!!')
    ratio = Math.floor(Number(input[inputIndex][0]) / Number(element[0]));
    maxReactions = ratio < maxReactions ? ratio : maxReactions;
  })
}


// export function oreToFuel(){
//   let numOfOre = 10;
//   let combined = []
//   //{chemistryOutcomes,chemistryIngrediants}
//   for (var i= 0 ; i<chemistryOutcomes.length; i++){
//   combined[i] = chemistryOutcomes[i].concat(chemistryIngrediants[i]);
//   }
//   debugger;
//   return numOfOre;
// }