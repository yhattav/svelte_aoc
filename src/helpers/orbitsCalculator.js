import {orbitsArray} from '../consts/orbits'

export function getNumberOfOrbits(){

  let levelArray = [['COM']]
  let ringIndex = 0;
  let numOfTotalOrbits = orbitsArray.length;
  console.log('before we start: ', orbitsArray )
  let newArray = orbitsArray;
do {
  console.log(levelArray, levelArray[ringIndex])
  console.warn(ringIndex)

  levelArray[ringIndex] && levelArray[ringIndex].forEach((orbitedObject)=>{
    console.warn('>>>>>>>>>orbitedObject:',orbitedObject)
    let FFFFindex = newArray.length - 1;
    while (FFFFindex >= 0) {
        if (newArray[FFFFindex][0] === orbitedObject){
          levelArray[ringIndex+1] = levelArray[ringIndex+1] ? levelArray[ringIndex+1] : [];
          levelArray[ringIndex+1].push(newArray[FFFFindex][1]);
          newArray.splice(FFFFindex, 1);
          numOfTotalOrbits-=1;
        }
      FFFFindex -= 1;
    }
    console.log('>>>>>>>>>>>>>>> numOfTotalOrbits: ',numOfTotalOrbits)
  })
  ringIndex++;
} while (numOfTotalOrbits > 0 && levelArray[ringIndex]);
let res = 0;
levelArray.forEach((element,index) =>{
  res += element.length * index ;
})
console.warn(newArray)
return res;
}

export function getNumberOfOrbitsFrom(someObject){

  let levelArray = [[someObject]]
  let ringIndex = 0;
  let numOfTotalOrbits = orbitsArray.length;
  console.log('before we start: ', orbitsArray )
  let newArray = orbitsArray.slice(0);
do {
  console.warn(ringIndex)

  levelArray[ringIndex] && levelArray[ringIndex].forEach((orbitedObject)=>{
    console.warn('>>>>>>>>>orbitedObject:',orbitedObject)
    let FFFFindex = newArray.length - 1;
    while (FFFFindex >= 0) {
        if (newArray[FFFFindex][1] === orbitedObject){
          levelArray[ringIndex+1] = levelArray[ringIndex+1] ? levelArray[ringIndex+1] : [];
          levelArray[ringIndex+1].push(newArray[FFFFindex][0]);
          newArray.splice(FFFFindex, 1);
          numOfTotalOrbits-=1;
        }
      FFFFindex -= 1;
    }
    console.log('>>>>>>>>>>>>>>> numOfTotalOrbits: ',numOfTotalOrbits)
  })
  ringIndex++;
} while (numOfTotalOrbits > 0 && levelArray[ringIndex]);

return levelArray;
}


export function getMinimalOrbitJumps(fromObject,toObject){
  let fromArray = getNumberOfOrbitsFrom(fromObject);
  let toArray = getNumberOfOrbitsFrom(toObject);
console.log(fromArray[fromArray.length-1]===toArray[toArray.length-1][0],fromArray[fromArray.length-1][0],toArray[toArray.length-1][0])
  while (fromArray[fromArray.length-1][0]===toArray[toArray.length-1][0]){
    fromArray.pop();
    toArray.pop();
    console.log('HEY IM HERE')
  }
  console.log(fromArray,toArray)
  return fromArray.length+toArray.length-2;
}