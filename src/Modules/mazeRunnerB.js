import { Key } from "paper";
import {isUpperCase,isLowerCase,isArrayOfUndefinedOnly,arraysEqual} from '../helpers/utils'

function isKey(char){
  return isLowerCase(char);
}

function isDoor(char){
  return isUpperCase(char);
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
  if(isKey(panel[position[0]][position[1]]) || isDoor(panel[position[0]][position[1]])){
    foundItems.push([panel[position[0]][position[1]],stepsUntillNow,[position[0],position[1]]]);
  } 
} catch(e) {
  console.log(e);
  debugger;
}

    paint('#',position,panel);

    movementPossibilities = findPossibleDirectionsToMove(position,panel);
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


function fillDeadEndsAndLogPossitions(mazeArray,startingPosition,keyPositions,doorPositions) {

  let maze = mazeArray;
  let mazeY = maze.length;
  let mazeX = maze[0].length;
  let removedInStep;

  function removeDeadEndRun(maze){
    let removed = 0;

    for (var i=0 ; i<mazeY ; i++ ) {
      for (var j=0 ; j<mazeX ; j++ ) {

          if(maze[i][j]==='.' || isDoor(maze[i][j])){
            if(findPossibleDirectionsToMove([i,j],maze).length<=1 && !(i === startingPosition[0] && j === startingPosition[1])){
              maze[i][j] = '#';
              removed++;
            } 
          }


          if(isDoor(maze[i][j])) {
            doorPositions[getCharIndex(maze[i][j])] = [i,j];
          } 


          if (isKey(maze[i][j])){                
            keyPositions[getCharIndex(maze[i][j])] = [i,j];
          }
    }
  }
  return removed;
}
  //Open the door from last key before doing anything
  // remove remaining deadends
  do{
    removedInStep = removeDeadEndRun(maze);
  } while (removedInStep>0);
}

function doesLeftKeyContain(leftKeys,keyIndex){
  return leftKeys[keyIndex] !== undefined;
}


  function mapDistances(maze,distances,keyPositions,startingPosition){
    for (var i = 0 ; i <keyPositions.length ; i++) { // each possible key ever....
      if (keyPositions[i]) {
      let paths = useEcho(maze,keyPositions[i],0).possiblePaths;
      paths.forEach(element=>{
        element.forEach(element=>{
          let char = element[0];
          if(isKey(char)){
            if(!distances[i]) distances[i] = [];
            distances[i][getCharIndex(char)] = distances[i][getCharIndex(char)] ? Math.min(distances[i][getCharIndex(char)],element[1]) : element[1];;
          }
        })
      })
    }
    let paths = useEcho(maze,startingPosition,0).possiblePaths;
    paths.forEach(element=>{
      element.forEach(element=>{
        let char = element[0];
        if(isKey(char)){
          if(!distances[27]) distances[27] = [];
          distances[27][getCharIndex(char)] = distances[27][getCharIndex(char)] ? Math.min(distances[27][getCharIndex(char)],element[1]) : element[1];
        }
      })
    })
  }
  }

  function getBlockings(possiblePaths, blockings) {

    possiblePaths.forEach(element=>{
      let blocks = [];
      element.forEach(element=>{
        let char = element[0];
        if(isDoor(char) || isKey(char)){
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
  
  function getDistanceToCollectKeys(keyPosition,keyIndex,blockings,leftKeys,distances,cache,keyPath,distanceToHere){
    let myLeftKeys = leftKeys.slice(0);
    let myKeyPath = keyPath.slice(0);
    let myBlockings = blockings.map(function(arr) {
      return arr.slice();
    });
    //get the key I jumped to with its location,
    // remove this key from the list of needed keys.
    if(keyIndex !== undefined) {
      myLeftKeys[keyIndex] = undefined;
    }
    if(keyIndex !== undefined) {
      removeDoorsFromBlockingsByKey(keyIndex,myBlockings);
    }
    // if the list is empty - return stepsUntillNow. (better add the steps to this key on the call to it).
    // if(!anyKeysLeft(myLeftKeys)) {
    //   console.warn(myKeyPath);
    //   debugger;
    //   return 0;
    // }
    
    let simplifiedLeftKeys = simplifyLeftKeys(myLeftKeys);
    if (cache) {
      let cached = false;
      
      cached = getCacheForState(cache,String.fromCharCode(97+keyIndex) + '+' + simplifiedLeftKeys)
      if (cached) {
        // console.log(keyIndex,keyPosition,simplifiedLeftKeys, 'returning:',cached);
        // console.log(myKeyPath)
        return cached;
      }
    }
    
    // openDoors in a NEW blockings Array made from the one I got. 2 dim?
    // find possibilities by combining blockings with the existing Keys array (where I should remove myself);
    let posibilities = getPossibilitiesFromMatching(myLeftKeys,myBlockings,keyIndex,distances);
    myKeyPath.push(String.fromCharCode(97+keyIndex));
    myKeyPath[0]+=distanceToHere || 0;
    let posArray = posibilities.posArray;
    // console.log(posArray);
    if (posArray && posArray.length<1) {
        return {result: 0, keyPath: String.fromCharCode(97+keyIndex) + ' , ' + 0};
      }
    // for each possible key - getDistanceToCollectKeys.
    //console.log(posArray)
    posArray.sort((a,b)=> a[1]-b[1]);
    // console.log(posArray);
    if(keyIndex === undefined) {
      keyIndex = 27;
    }
    // if(!myKeyPath[1]) myKeyPath[1] = 0;
    
    // if(doesLeftKeyContain(myLeftKeys,0) && keyIndex === 9) debugger;

    let result = Infinity;
    // myKeyPath[1]+=result;
    let bestKeyPath
    let CopyPosArray = posArray;
    posArray.forEach(element=>{
      let getDistance = getDistanceToCollectKeys(myLeftKeys[element[0]], element[0],myBlockings,myLeftKeys,distances,cache,myKeyPath,element[1]);
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
    // if(!cache[keyPosition[0]][keyPosition[1]]) cache[keyPosition[0]][keyPosition[1]] = [];
    // if(doesLeftKeyContain(myLeftKeys,0) && keyIndex === 6) debugger;
    let res = {result, keyPath: bestKeyPath}
    cache.push([String.fromCharCode(97+keyIndex) + '+' + simplifiedLeftKeys,res]);
    if(res.keyPath[0] !== String.fromCharCode(97+keyIndex)) debugger;
    return res;
  }

    export function solveMaze(mazeInput,startingPosition = [40,40],numberOfTotalKeys = 26) {
      debugger;
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
      let keyPositions = new Array(26);
        keyPositions.fill(undefined);
      let doorPositions = new Array(26);
        doorPositions.fill(undefined);
      let distances = new Array(26);
      let blockings = new Array(26);
      let keyPath = [0];

      let possiblePaths = []
      fillDeadEndsAndLogPossitions(mazeArray,startingPosition,keyPositions,doorPositions) // mutating the array.
      //things I want before I start: 

      //find a map of [key,tokey,steps] for all the possible keys. maybe a->a is 0,0 etc... ill need a function of char to index.
      mapDistances(mazeArray,distances,keyPositions,startingPosition);
        //create a map for path to each key and retreive blockers.
      possiblePaths = useEcho(mazeArray,startingPosition,0).possiblePaths;
      getBlockings(possiblePaths,blockings);


      
      //possibilities = removeBlockedPaths(possibilities);
      
      //for each step the possible keys are the ones that are not hiding anymore.

      //start with the first step (entrance)
      // getDistanceToCollectKeys(27,blockings,keyPositions,0,treeLengthLog,distances);
      //(keyPosition,keyIndex,blockings,leftKeys,distances,cache)
      debugger;
      let shortestDistance = getDistanceToCollectKeys(startingPosition,undefined,blockings,keyPositions,distances,cache,keyPath)
      //retreive the possible steps to them.
      console.warn(shortestDistance)
      debugger;
      // for each, go and retreive the possible steps for them (remove the doors); if no more possibilities return the steps sum

      console.log(treeLengthLog.sort((a,b)=> b-a));
      let res = treeLengthLog.pop()
      console.warn(res);
      return res;
    }


    // function isBetter(position,steps,loot,)
    // const lockedDoors = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
