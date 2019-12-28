import {isUpperCase,isLowerCase,isArrayOfUndefinedOnly,arraysEqual,removeDups} from '../helpers/utils'
import jKstra from 'jKstra'

function dijkkstraToShortest(distances,uniquePortals){
  debugger;

}
































function isKey(char){
  return isLowerCase(char);
}

function isUpperCaseSingleChar(char){
  return char.length === 1 && isUpperCase(char);
}

function isPortal(str){
  return str.length === 4;
}

function findPossibleDirectionsToMove(position, panel, wall = '#'){
  try {
  let x = position[1];
  let y = position[0];
  let possibilitiesArray = []
  if(!(panel[y-1][x] === wall)) {
    possibilitiesArray.push([y-1,x]);
  }
  if(!(panel[y+1][x] === wall)) {
    possibilitiesArray.push([y+1,x]);
  }
  if(!(panel[y][x-1] === wall)) {
    possibilitiesArray.push([y,x-1]);
  }
  if(!(panel[y][x+1] === wall)) {
    possibilitiesArray.push([y,x+1]);
  }
  return possibilitiesArray
}catch(e){
  debugger;
}
}
function findPossibleTilesForPath(position, panel){
  try {
  let x = position[1];
  let y = position[0];
  let possibilitiesArray = []
  if(panel[y-1][x] === '.' || isPortal(panel[y-1][x])) {
    possibilitiesArray.push([y-1,x]);
  }
  if(panel[y+1][x] === '.' || isPortal(panel[y+1][x])) {
    possibilitiesArray.push([y+1,x]);
  }
  if(panel[y][x-1] === '.' || isPortal(panel[y][x-1])) {
    possibilitiesArray.push([y,x-1]);
  }
  if(panel[y][x+1] === '.' || isPortal(panel[y][x+1])) {
    possibilitiesArray.push([y,x+1]);
  }
  return possibilitiesArray
}catch(e){
  debugger;
}
}

function hasPathNeighbor(position, panel, pathChar ='.'){
  try {
  let x = position[1];
  let y = position[0];
  let possibilitiesArray = []
  if((panel[y-1][x] === pathChar)) {
    possibilitiesArray.push([y-1,x]);
  }
  if((panel[y+1][x] === pathChar)) {
    possibilitiesArray.push([y+1,x]);
  }
  if((panel[y][x-1] === pathChar)) {
    possibilitiesArray.push([y,x-1]);
  }
  if((panel[y][x+1] === pathChar)) {
    possibilitiesArray.push([y,x+1]);
  }
  return possibilitiesArray.length > 0;
}catch(e){
  debugger;
}
}
function findSecondPortalLetter(panel,y,x){
  try {
  if(isUpperCaseSingleChar(panel[y-1][x])) {
    return ['above',panel[y-1][x]];
  }
  if(isUpperCaseSingleChar(panel[y+1][x])) {
    return ['below',panel[y+1][x]];
  }
  if(isUpperCaseSingleChar(panel[y][x-1])) {
    return ['left',panel[y][x-1]];
  }
  if(isUpperCaseSingleChar(panel[y][x+1])) {
    return ['right',panel[y][x+1]];
  }
}catch(e){
  debugger;
}
}

function paint(value,paintPosition = position,panel){
  panel[paintPosition[0]][paintPosition[1]] = value;
}

function echo(possiblePaths,mazeArray,position,steps,priorFindItems) {
  let stepsUntillNow = steps;
  let panel = mazeArray.map(function(arr) {
    return arr.slice();
  });
  let foundItems = priorFindItems.slice(0);
  let movementPossibilities;
  // do
  // fill this point with air
  // find possible places to spread
  // console.log(panel[position[0]][position[1]]);
  // console.log('at position', position, steps, panel)
  try{
  if(isPortal(panel[position[0]][position[1]]) && stepsUntillNow !== 0){
    foundItems.push([panel[position[0]][position[1]],stepsUntillNow-1,[position[0],position[1]]]); //could be -1.... to the steps. need to make sure
  }
} catch(e) {
  console.log(e);
  debugger;
}


paint('#',position,panel);
movementPossibilities = findPossibleTilesForPath(position,panel);
if(movementPossibilities === undefined) debugger;
if(movementPossibilities.length<=0){
  possiblePaths.push(foundItems.slice(0));
  return;
} else {
      movementPossibilities.forEach(element=>{
        echo(possiblePaths,panel ,element,stepsUntillNow+1,foundItems);
      });
    }

  }

function findNextKeyPossibilities(nextKeyPossibilities,mazeArray,position,openDoorsArray,foundKeysArray,steps){
  let stepsUntillNow = steps;
  let panel = mazeArray;
  //console.warn('executing droid, starting position:', position, panel);
  let openDoors = openDoorsArray.slice(0);
  let foundKeys = foundKeysArray.slice(0);

      function findPossibleDirectionsToMove(position){
        let x = position[1];
        let y = position[0];
        let possibilitiesArray = []
        if(panel[y-1][x] === '.'  || isKey(panel[y-1][x]) || openDoors.includes(panel[y-1][x])) {
          possibilitiesArray.push([y-1,x]);
        }
        if(panel[y+1][x] === '.'   || isKey(panel[y+1][x])  || openDoors.includes(panel[y+1][x])) {
          possibilitiesArray.push([y+1,x]);
        }
        if(panel[y][x-1] === '.'  || isKey(panel[y][x-1])   || openDoors.includes(panel[y][x-1])) {
          possibilitiesArray.push([y,x-1]);
        }
        if(panel[y][x+1] === '.'  || isKey(panel[y][x+1])   || openDoors.includes(panel[y][x+1])) {
          possibilitiesArray.push([y,x+1]);
        }
        return possibilitiesArray
      }
      let movementPossibilities;
      //do
      // fill this point with air
      // find possible places to spread
      if(isKey(panel[position[0]][position[1]]) && !foundKeys.includes(panel[position[0]][position[1]])){
        nextKeyPossibilities.push([panel[position[0]][position[1]],stepsUntillNow,[position[0],position[1]]]);
        paint('*',position,panel);
        return;
      } else {
        paint('*',position,panel);
        movementPossibilities = findPossibleDirectionsToMove(position,panel);
        if(movementPossibilities.length<=0){
          return;
        } else {
          movementPossibilities.forEach(element=>{
            findNextKeyPossibilities(nextKeyPossibilities,panel,element,openDoors.slice(0),foundKeys.slice(0),stepsUntillNow+1);
          });
        }
      }
    }


function useEcho(maze,position,stepsUntillNow){

  let mazeForEcho = maze.map(function(arr) {
      return arr.slice();
    });
  let possiblePaths = []
  echo (possiblePaths,mazeForEcho,position,stepsUntillNow,[],stepsUntillNow);
  let possiblePathArrays = possiblePaths.map(element=>{
    let newArr = []
    element.map(element=>{
      newArr.push(element[0]);
    });
    return newArr;
  });

  return {possiblePathArrays,possiblePaths}
}

function getCharIndex(char){
  char = char.toLowerCase();
  return  char.charCodeAt(0) - 97;
}

function getPortalIndex(uniquePortals,portal){
  let res = uniquePortals.indexOf(portal)
  return res;
}


export function fillDeadEndsAndLogPossitions(mazeArray,startingPosition=[0,0],portalPositions=[]) {
  let maze = mazeArray;
  let mazeY = maze.length;
  let mazeX = maze[0].length;
  let removedInStep;

  function removeDeadEndRun(maze){
    let removed = 0;

    for (var i=2 ; i<mazeY-2 ; i++ ) {
      for (var j=2 ; j<mazeX-2 ; j++ ) {

          if(maze[i][j]==='.'){
            if(findPossibleDirectionsToMove([i,j],maze).length<=1 && !(i === startingPosition[0] && j === startingPosition[1])){
              maze[i][j] = '#';
              removed++;
            }
          }

    }
  }
  return removed;
}



function getNameOfPortal(maze,doorChar,doorY,doorX){
  let res = findSecondPortalLetter(maze,doorY,doorX);
  let outer = doorY<5 || doorY >mazeY-5 || doorX<5 || doorX>mazeX-5
  let direction = res[0];
  let char = res[1];

  switch (direction){
    case 'above':
    case 'left':
      return char + doorChar + (outer ? ':O':':I');
    case 'below':
    case 'right':
      return doorChar+ char + (outer ? ':O':':I');
  }
  
}

function findPortalPositions(maze){
  for (var i=1 ; i<mazeY-1 ; i++ ) {
    for (var j=1 ; j<mazeX-1 ; j++ ) {

      if(isUpperCaseSingleChar(maze[i][j]))
      {
        if(hasPathNeighbor([i,j],maze,'.')) {
          let name = getNameOfPortal(maze,maze[i][j],i,j);
          portalPositions.push([name,[i,j]]);
          maze[i][j] = name;
        }
      } 

    }
  }
}
function removeExtraPortalLetter(maze){
  for (var i=0 ; i<mazeY ; i++ ) {
    for (var j=0 ; j<mazeX ; j++ ) {

      if(isUpperCaseSingleChar(maze[i][j]))
      {
        maze[i][j] = '#';
      } 

    }
  }
}
  //Open the door from last key before doing anything
  // remove remaining deadends
  do{
    removedInStep = removeDeadEndRun(maze);
  } while (removedInStep>0);

  findPortalPositions(maze);
  console.log(portalPositions);
  removeExtraPortalLetter(maze);
}

// function doesLeftKeyContain(leftKeys,keyIndex){
//   return leftKeys[keyIndex] !== undefined;
// }


  function mapDistances(maze,distances,portalPosition,uniquePortals){
    for (var i = 0 ; i <uniquePortals.length ; i++) { // each possible key ever....
      portalPosition.map(element=>{
        if(element[0] && element[0] === uniquePortals[i]){
          let paths = useEcho(maze,element[1],0).possiblePaths;
          paths.forEach(element=>{
            element.forEach(element=>{
              let name = element[0];
              if(isPortal(name)){
                if(!distances[i]) distances[i] = [];
                distances[i][getPortalIndex(uniquePortals, name)] = distances[i][getPortalIndex(uniquePortals, name)] ? Math.min(distances[i][getPortalIndex(uniquePortals, name)],element[1]) : element[1];;
              }
            })
          })
        }
      })
    // let paths = useEcho(maze,startingPosition,0).possiblePaths;
    // paths.forEach(element=>{
    //   element.forEach(element=>{
    //     let char = element[0];
    //     if(isKey(char)){
    //       if(!distances[27]) distances[27] = [];
    //       distances[27][getCharIndex(char)] = distances[27][getCharIndex(char)] ? Math.min(distances[27][getCharIndex(char)],element[1]) : element[1];
    //     }
    //   })
    // })
  }
  }

  function getBlockings(possiblePaths, blockings) {

    possiblePaths.forEach(element=>{
      let blocks = [];
      element.forEach(element=>{
        let char = element[0];
        if(isUpperCaseSingleChar(char) || isKey(char)){
          blocks.push(char);
        }
        if (isKey(char)) {
          blockings[getCharIndex(char)] = blocks.slice(0);
        }
      })
    })
  }

  function anyKeysLeft(leftKeys){
    return !isArrayOfUndefinedOnly(leftKeys);
  }

  function getPossibilitiesFromMatching(leftKeys,blockings,currentKeyIndex = 27,distances){
    let posArray = []
    let furthestKeySteps = 0;

    leftKeys.forEach((element,index)=>{

      if (element && blockings[index].length<=1){
        posArray.push([index,distances[currentKeyIndex][index]]);

        if(distances[currentKeyIndex][index] > furthestKeySteps){
          furthestKeySteps = distances[currentKeyIndex][index]
        }
      }

    });
    return {posArray, furthestKeySteps}
  }

  function removeDoorsFromBlockingsByKey(keyIndex,blockings){ //mutative
    let door = String.fromCharCode(65+keyIndex);
    let key = String.fromCharCode(97+keyIndex)
    let newBlockings = blockings.map(element=>{
      if (element && element.length > 0){
        for ( var i = 0 ; i<element.length ; i++) {
          if(element[i] === door || element[i] === key) {
          element.splice(i,1);
          i--;
          }
        }
        return element;
      }
    })
    return newBlockings;
  }

  function getCacheForState(cacheForPosition,keysState){
    let res = false
    let matchingState = cacheForPosition.find(element => element[0]===keysState)
    if(matchingState) {
      res = matchingState[1];
    }
    return res;
  }

  function simplifyLeftKeys(leftKeys){
    let keyString = ''
    leftKeys.forEach((element,index)=>{
      if(element !== undefined){
        keyString += String.fromCharCode(97+index);
      }
    })
    return keyString;
  }


  function getDistanceToCollectKeys(keyIndex,distances,cache,keyPath,distanceToHere){
    let myKeyPath = keyPath.slice(0);

    //get the key I jumped to with its location,
    // remove this key from the list of needed keys.

    // let simplifiedRoute = simplifiedRoute(myKeyPath);
    // if (cache) {
    //   let cached = false;

    //   cached = getCacheForState(cache,String.fromCharCode(97+keyIndex) + '+' + simplifiedLeftKeys)
    //   if (cached) {
    //     return cached;
    //   }
    // }

    // openDoors in a NEW blockings Array made from the one I got. 2 dim?
    // find possibilities by combining blockings with the existing Keys array (where I should remove myself);
    let options = getOptions(portalName);
    myKeyPath.push(portalName);
    myKeyPath[0]+=distanceToHere || 0;
    let posArray = options;
    // console.log(posArray);
    if (posArray && posArray.length === 1 && posArray[0].portalName === 'ZZ' && floor === 0 ) {
        return {result: 0, keyPath: portalName + ' , ' + 0};
      }

    let result = Infinity;
    let bestKeyPath

    posArray.forEach(element=>{
      let getDistance = getDistanceToCollectKeys(element[0],myLeftKeys,distances,cache,myKeyPath,element[1]);
      let distance = element[1] + getDistance.result;
      // if(getDistance.keyPath.includes('i , 9e , 5p , 13a , 5k , 16j , 14o , 0')) debugger;
      let returnedKeyPath =  String.fromCharCode(97+keyIndex) +' , '+ element[1] + getDistance.keyPath;
      // console.log(element[1], distance - element[1]);
      if (keyIndex === 27) {
        console.log(result,distance)
      }
      if(distance<result) {
        result = distance;
        bestKeyPath = returnedKeyPath;
      }
      result = Math.min(result,distance);
    });

    let res = {result, keyPath: bestKeyPath}
    cache.push([String.fromCharCode(97+keyIndex) + '+' + simplifiedLeftKeys,res]);
    if(res.keyPath[0] !== String.fromCharCode(97+keyIndex)) debugger;
    return res;
  }

  function getSiblingName(name) {
    let res = name[0]+name[1]+name[2]+ (name[3] ==='O' ? 'I' : 'O')
    return res;
  }

  function getOptions(portalName, distances, uniquePortals){
    let options=[];
    let index = getPortalIndex(uniquePortals,portalName)
    distances[index].map((element,elemIndex)=>{
      if(element){
        let optionalPortalName = getSiblingName(uniquePortals[elemIndex]);
        options.push([optionalPortalName,element]);
      }
    })
    return options
  }

  function isOuter(portalName){
    return portalName[3] === 'O';
  }

    export function solveMaze(mazeInput,startingPosition = [40,40],numberOfTotalKeys = 26) {
      let treeLengthLog = [];
      // let memoryArray = mazeInput.map(function(arr) {
      //   return arr.slice();
      // });
      let mazeArray = mazeInput.map(function(arr) {
        return arr.slice();
      });
      let mazeY = mazeArray.length;
      let cache = new Array(mazeY);
      cache.fill([]);
      // executeMazeRunner(mazeArray,startingPosition,['@'],[],0,numberOfTotalKeys,treeLengthLog,memoryArray);

      // lets use my basic no dead ends maze....
      let portalPositions = []
        let blockings = new Array(26);
        let keyPath = [0];
        
        let possiblePaths = []
        fillDeadEndsAndLogPossitions(mazeArray,startingPosition,portalPositions) // mutating the array.
        //things I want before I start:
        let portalNames = portalPositions.map(element=>element[0]);
        let uniquePortals = removeDups(portalNames).sort((a, b) => a.localeCompare(b))
        // uniquePortals = uniquePortals.map((element,index)=>[element,index]);
        let distances = new Array(uniquePortals.length);
      //find a map of [key,tokey,steps] for all the possible keys. maybe a->a is 0,0 etc... ill need a function of char to index.
      mapDistances(mazeArray,distances,portalPositions,uniquePortals);

      console.log({uniquePortals})
      console.log({distances})
    
        //create a map for path to each key and retreive blockers.
      // possiblePaths = useEcho(mazeArray,startingPosition,0).possiblePaths;
      // getBlockings(possiblePaths,blockings);
      console.log(uniquePortals);      
        let shortestDistance = Infinity;
        let travel = new Array()
        travel = [];
        let path = [];
        travel.push(['AA:O', 0, 0,path]);
        let found = false
        while (travel.length>0 && !found){
          let currentTravelPoint = travel.splice(0,1)[0]
          let [currentName, floor, distanceSoFar,pathToHere] = currentTravelPoint;
          let options = getOptions(currentName, distances, uniquePortals)
          options.forEach(element=>{
            const [portalName, distanceTo] = element;
            let nextFloor;
            
            if (isOuter(portalName)){ 
              nextFloor = floor+1; //its in reverse because i am getting the next floor symbol already( i is o)
            } else {
              nextFloor = floor-1;
            }
            let isViableOption = true
            if(portalName.includes('ZZ') && floor === 0) {
              console.warn(distanceSoFar+distanceTo,pathToHere);
              shortestDistance = Math.min(shortestDistance, distanceSoFar+distanceTo);
            }
            if (portalName.includes('ZZ') && floor !== 0) isViableOption = false;
            if (portalName.includes('AA')) isViableOption = false;
            if (nextFloor < 0) isViableOption = false;
            if (distanceSoFar+distanceTo > shortestDistance) isViableOption = false;

            let pathNodeName = currentName + floor;
            let newPath = pathToHere.slice();
            newPath.push(pathNodeName);
            isViableOption && travel.push([portalName, nextFloor, distanceSoFar+distanceTo,newPath]);
            
      
          });
      
        }



      // let shortest = dijkkstraToShortest(distances,uniquePortals)

      // let shortestDistance = getDistanceToCollectKeys(startingPosition,undefined,blockings,keyPositions,distances,cache,keyPath)
      //retreive the possible steps to them.
      // console.warn('ANSWER TO PART 1:', shortest-1) // to get to the front of the portal....
      console.warn('WINNER IS: ', shortestDistance-1)
      // for each, go and retreive the possible steps for them (remove the doors); if no more possibilities return the steps sum

      // console.log(treeLengthLog.sort((a,b)=> b-a));
      // let res = treeLengthLog.pop()
      // console.warn(res);
      // return shortest-1;
    }
