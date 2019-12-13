import { Moon } from "../helpers/Moon";

export function runMoons(steps,positions) {
  let factorsArray =[];
  let factors = [false,false,false,false];
  let moons = [];
  positions.map((element,index)=>{
    let config = {
      compId: `Moon-${index}`,
      position: element,
      numberOfSiblings: positions.length,
    }
    moons[index] = [new Moon(config),element];
  });
  let step = 0;
  function updatePositions(){
    moons.map((element,index)=>{
      positions[index] = element[1];
    });
  }
  function stepAllMoons(){
    moons.forEach((element,index)=>{
      let newArr = positions.slice(0);
      newArr.splice(index,1);
      factors[index] = element[0].step(newArr);
      element[1] = element[0].getPosition();
    });
  }
  do {
    stepAllMoons()
    updatePositions()
    step++;
  } while (!(factors[0] && factors[1] && factors[2] && factors[3] ));

  
  function getTotalEnergy(){
    let energy = 0;
    moons.map(element=>{
      energy+= element[0].getEnergy();
    })
    return energy;
  }
  console.log(factors)
  factors.forEach((element)=>{
    factorsArray= factorsArray.concat(element)});
  factorsArray = removeDups(factorsArray);
  factorsArray = factorsArray.map(Number);
  console.warn(factorsArray);
  let mcd = reminderIsZeroArray(factorsArray)
  console.warn(mcd);
  console.warn(step,getTotalEnergy());
  return mcd;
  }
  function removeDups(names) {
    let unique = {};
    names.forEach(function(i) {
      if(!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }

  function reminderIsZero(x, y) {
    let big;
    let small;
    let number;
    if (x > y) {
      big = x;
      small = y;
    } else {
      big = y;
      small = x;
    }
    number = big;
    // eslint-disable-next-line fp/no-loops
    // eslint-disable-next-line no-constant-condition
    // eslint-disable-next-line fp/no-loops
    while (true) {
      number += big;
      if (number % small === 0) {
        return number;
      }
    }
  }
  function reminderIsZeroArray(valueArray) {
    valueArray = valueArray.sort((a, b) => a < b);
    console.log({ valueArray });
    let number = reminderIsZero(valueArray[0], valueArray[1]);
    const array = valueArray.slice(2);
    array.forEach(element => {
      number = reminderIsZero(number, element);
    });
    return number;
  }