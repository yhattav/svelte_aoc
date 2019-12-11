import {asteroidsMapArray,asteroidsX,asteroidsY} from '../consts/asteroidsInput'

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


function calculateRelativeAngle(base,asteroid){
  let angle = Math.atan2((asteroid[1]-base[1]), (asteroid[0]-base[0])) * 180 / Math.PI;
  let distance = Math.hypot(asteroid[0]-base[0], asteroid[1]-base[1])
  return {angle, distance};
}


function getNumberOfVisibles(base){
  let angleArray = [];
  let coordinatesArray =[];
  let angle;
  let prop;
  for(var y=0;y<asteroidsY;y++){
    for(var x=0;x<asteroidsX;x++){
      if(asteroidsMapArray[y][x] === '#'){
        prop = calculateRelativeAngle(base,[x,y]);
        angle = prop.angle
        angleArray.push(angle);
        if(prop.distance){
          coordinatesArray.push([angle,prop.distance,[x,y]])
        }
      }
    }
  }
  const res = countUnique(angleArray);
  // console.log('?uniques',coordinatesArray, countUnique(coordinatesArray))
  // console.log('for', base[0],base[1], ' num:', res);
  return {number: res.size, coordinatesArray, set: res} //for the 0 in there TODO - check its really there all the time.. it should


}


function countUnique(iterable) {
  return new Set(iterable);
}

export function findBestLocation(){
  let highestLocation = [];
  let highestCount = -Infinity;
  let numberOfVisible
  for(var y=0;y<asteroidsY;y++){
    for(var x=0;x<asteroidsX;x++){
      if(asteroidsMapArray[y][x] === '#'){
        numberOfVisible = getNumberOfVisibles([x,y]);
        if(numberOfVisible>highestCount){
          highestCount = numberOfVisible;
          highestLocation = [x,y];
        }
      }
      
    }
  }

  console.warn('found:', {highestCount,highestLocation});
  return {highestCount,highestLocation}
}
//37,25

export function findNthToBeVaporized(base,n) {
  base = [37,25];
  n = 200;
  let numOfVisible 
  numOfVisible = getNumberOfVisibles(base);
  console.log(numOfVisible.coordinatesArray);
  (numOfVisible.coordinatesArray).sort( (a,b) => {
    if (a[0]-b[0])
    { return (a[0]-b[0]);
    } else {
      return (a[1]-b[1]);
    }
  });
  

  let index = numOfVisible.coordinatesArray.findIndex(element=>element[0]>=-90)
  console.log(index);
  let count = 0;
  let countArray = [];
  let lastRemoved=[''];
  let current;
  do{
    current = numOfVisible.coordinatesArray[index];
    if(current[0] !== lastRemoved[0][0]){
      lastRemoved = numOfVisible.coordinatesArray.splice(index,1);
      countArray.push(lastRemoved[0]);
      count++;
    } else {
      console.log('skipping one');
      index++;
    }

    if(index>=numOfVisible.coordinatesArray.length){
      index = 0;
      lastRemoved = [''];
    }

  } while (numOfVisible.coordinatesArray.length>0)

  console.log(countArray);
  console.warn(countArray[n-1]);

}