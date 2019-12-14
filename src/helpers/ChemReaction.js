
export class ChemReaction {

  constructor(config) {
    this.output = config.output;
    this.input = config.input;
    this.CBForORE = config.CBForORE;
    this.isORE = config.isORE;
    this.debug = ' '
  }

  getMinima(number){
    let res
    if(this.isORE){
      res = [[]];
    } else {
      if(this.output[1] === this.debug) debugger;

      res = this.calcRequieredInput(number)
    }
    return res;
  };

  create(input){
    let outputNum = 0;
    let reactionsNumber;
    let res = [];
    let inputIndex;
    if(this.isORE){
      this.CBForORE(1);
      outputNum = 1;
    } else {
      if(this.output[1] === this.debug) debugger;
      reactionsNumber = this.findMaxReactionsWithInput(input);
      outputNum = reactionsNumber * Number(this.output[0]);
      input = this.input.map(element=>{
        inputIndex = input.findIndex(elem=> (elem[1] === element[1]))
        return [element[1], (Number(input[inputIndex][0]) % (Number(element[0]) * reactionsNumber))]
      })
  }
  res = input;
  let createdElement = [this.output[1],outputNum]
  res.unshift(createdElement);


    return res;
  }

  calcRequieredInput(number) {
    let reqNumberOfReactions = Math.ceil(number / Number(this.output[0]));

    let res = this.input.map(element=>{
      return [String(Number(element[0])*reqNumberOfReactions),element[1]];
    })
    return res;
  }

  findMaxReactionsWithInput(input) {
    let inputIndex;
    let maxReactions = Infinity;
    let ratio;
    this.input.forEach(element=>{
      inputIndex = input.findIndex(elem=> (elem[1] === element[1]))
      if(inputIndex<0 || (Number(input[inputIndex][0]) < Number(element[0]))) console.error('Cant Find Enough of The Right Ingrediant!!!!!')
      ratio = Math.floor(Number(input[inputIndex][0]) / Number(element[0]));
      maxReactions = ratio < maxReactions ? ratio : maxReactions;
    })
    return maxReactions;
  }
}
