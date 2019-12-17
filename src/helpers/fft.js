
export class FFT {

  constructor(config) {
    this.debugID = 'Moon-0'
    this.compId = config.compId;
    this.currentStep = 0;
    this.input = config.input;
    this.steps = config.steps;
    this.log = [config.input]
    this.pattern = config.pattern;
    this.patternLength = this.pattern.length;
    this.inputLength = this.input.length;
    

    // this.patternMatrix = this.createPatternMatrix(this.pattern);
  }


  getInputLength(){
    return this.input.length
  }
  getPatternLength(){
    return this.pattern.length
  }

  addEveryRow(matrix) {
    //this should be mutative...To make sure...
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    matrix.forEach((element,index,array)=>{
      let sum = element.reduce(reducer)
      array[index] = Math.abs(sum) % 10;
    });

  }

  getPatternMultiplier(row,col){
    let pattern = this.pattern;
    let ratio = col / row
    let index = Math.floor(ratio) % 4;
    return pattern[index];
    }
  

  // multiplyMatrices(inputString, m2) {
  //   var result = [];
  //   for (var i = 0; i < inputString.length; i++) {
  //       result[i] = [];
  //       for (var j = 0; j < m2[0].length; j++) {
  //           var sum = 0;
  //           result[i] += Number(inputString[j])*this.getPAtternMultiplier(i+1,j+1);
  //       }
  //   }
  //   return result;
  // }

  // multiply(inputString) {
  //   debugger;
  //   var result = '';
  //   for (var i = 0; i < inputString.length; i++) {
  //       for (var j = i; j < inputString.length; j++) {
  //           var sum = 0;
  //           result += (Math.abs(Number(inputString[j])*this.getPatternMultiplier(i+1,j+1))) % 10;
  //       }
  //   }
  //   return result;
  // }
  multiply(inputString) {
    var result = '';
    let row = 0
    for (var i = inputString.length-1; i >= 0; i--) {
      row += Number(inputString[i]);
    result= (Math.abs(row) % 10) + result;
  }
    return result;
  }

  getRowCalc(inputString,index){
    let res=0;
    for (var j = index+1; j <= inputString.length ; j++){
      let mod = Math.floor(j / (index+1)) % 4
      if(mod === 1) res+=Number(inputString[j-1]);
      if(mod === 3) res-=Number(inputString[j-1]);
    }
    return Math.abs(res) % 10;
  }
  // createInputMatrix(input){
    
  //   let array = input.split('').map(Number);

  //   let matrix = new Array(this.inputLength).fill(array.slice(0));

  //   return matrix;

  // }

  createPatternMatrix(pattern){
    
    let matrix = [];
    for(var i= 1; i<Math.floor(this.inputLength / 3)+1; i++){
      let line = []
      pattern.forEach(element=>{
        for(var j = 1; j <= i ; j++){
          line.push(element);
        }
      });
      while (line.length < this.inputLength + 1){
        line = line.concat(line);
      }
      line = line.slice(1,this.inputLength + 1);
      matrix.push(line);
    }
    debugger;
    return matrix;

  }
  // createPatternMatrix(pattern){
    
  //   let matrix = [];
  //   for(var i= 1; i<this.inputLength+1; i++){
  //     let line = []
  //     pattern.forEach(element=>{
  //       for(var j = 1; j <= i ; j++){
  //         line.push(element);
  //       }
  //     });
  //     while (line.length < this.inputLength + 1){
  //       line = line.concat(line);
  //     }
  //     line = line.slice(1,this.inputLength + 1);
  //     matrix.push(line);
  //   }
  //   return matrix;

  // }

  // createFirstSection(input){
  //   let multiplicationMatrix = this.multiplyMatrices(input,this.patternMatrix);
  //   this.addEveryRow(multiplicationMatrix);
  //   return multiplicationMatrix.toString().replace(/,/g, "")
  // }

  runStep(input){
    let output = this.multiply(input);
    return output;
  }


}

export function runFFT(input,pattern,steps){
  console.log(input)
  debugger;
  let output = input;
  let config = {
    input,
    pattern,
    steps
  }
  const fft = new FFT(config);
  for( var i=0; i<steps ; i++){
    output = fft.runStep(output);
  }
  debugger;
  console.log(fft.log)
  debugger;
}
