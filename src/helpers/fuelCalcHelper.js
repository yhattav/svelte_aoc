export 	function calcModuleFuel(moduleMass) {
const res = addAndCompensateForFuel(moduleMass);
return res;
}

export 	function calcFuelForMass(moduleMass) {
  return Math.floor(moduleMass / 3) - 2;
}

export function calcTotalFuel(massArray) {
  const reducer = (accumulator, currentValue) => accumulator + calcModuleFuel(currentValue);
  const res = massArray.reduce(reducer, 0);
  return res;
}

export function addAndCompensateForFuel(mass) {
  const startMass = mass;
  let fuelMassToCompansateFor = mass;
  while (fuelMassToCompansateFor >= 9) {
    fuelMassToCompansateFor = calcFuelForMass(fuelMassToCompansateFor);
    mass += fuelMassToCompansateFor;
  }
  mass -= startMass;
  return mass;
}