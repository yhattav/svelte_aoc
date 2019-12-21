import { Key } from "paper";


function executeMazeRunner(mazeArray,position,openDoorsArray,foundKeysArray,steps,numberOfTotalKeys,treeLengthLog){
    if(treeLengthLog[0] && steps >= treeLengthLog[0] ) {
      //console.warn('already found better than me', steps,treeLengthLog[0]);
      return;
    }
    let stepsUntillNow = steps;
    let panel = mazeArray.map(function(arr) {
      return arr.slice();
    });
    //console.warn('executing droid, starting position:', position, panel);
    let paintPositionLog = []
    let openDoors = openDoorsArray.slice(0);
    let foundKeys = foundKeysArray.slice(0);


    function paint(value,paintPosition = position){
      // //console.log('painting' ,value, paintPosition)
      panel[paintPosition[0]][paintPosition[1]] = value;
      paintPositionLog.push(paintPosition);
      //TODO check if painted twice? or wall twice - because then he is stupid.
    }



      function isKey(char){
        let ascii = char.charCodeAt(0);
        if(ascii>=97 && ascii <=122){
          return true;
        } else {
          return false;
        }
      }
      function isDoor(char){
        let ascii = char.charCodeAt(0);
        if(ascii>=65 && ascii <=90){
          return true;
        } else {
          return false;
        }
      }
        let possibilities;

        // if this is a key we need to log it, the possition, and the steps to it
        // we paint and go untill we return on lack of options.

        //this will be our next possibilities from the current location.

        // for each possibility. add the steps to it and do the same.




        // do
        // fill this point with air
        // find possible places to go
        // if(isKey(panel[position[0]][position[1]]) && !foundKeys.includes(panel[position[0]][position[1]])){
        //   panel = originalArray.map(function(arr) {
        //     return arr.slice();
        //   });
        //   openDoors.push(panel[position[0]][position[1]].toUpperCase());
        //   foundKeys.push(panel[position[0]][position[1]]);
        //   if(foundKeys.length === numberOfTotalKeys){
        //     treeLengthLog.unshift(stepsUntillNow);
        //     return;
        //   }
        // }
          openDoors.push(panel[position[0]][position[1]].toUpperCase());
          foundKeys.push(panel[position[0]][position[1]]);
          // let nextKeyPossibilities = []
          // let possibilitiesPanel = panel.map(function(arr) {
            //   return arr.slice();
            // });
            //digestMaze 
            // and find relevant options by order
            // findNextKeyPossibilities(nextKeyPossibilities,possibilitiesPanel,position,openDoors.slice(0),foundKeys.slice(0),stepsUntillNow);
            let pos = fillDeadEnds(panel,position,panel[position[0]][position[1]],stepsUntillNow);
            paint('.',position);

          //console.log('after going to:', foundKeys,'these are the possibilities:', nextKeyPossibilities)
          if(pos.length<=0){
            console.log(stepsUntillNow);
            treeLengthLog.unshift(stepsUntillNow);
            return;
          } else {
            pos.sort((a,b)=> a[1]-b[1])
            pos.forEach(element=>{
              executeMazeRunner(panel,element[2],openDoors.slice(0),foundKeys.slice(0),element[1],numberOfTotalKeys,treeLengthLog);
            });
          }
        

      // findFillingTime(startingPosition,panel.slice(0),0);
      // console.log(treeLengthLog.sort((a,b)=> a-b));
      // console.warn(treeLengthLog.pop());
    }

function echo(possiblePaths,mazeArray,position,steps,priorFindItems) {
  let stepsUntillNow = steps;
  let panel = mazeArray;
  //console.warn('executing droid, starting position:', position, panel);
  let foundItems = priorFindItems.slice(0);

  function paint(value,paintPosition = position){
    panel[paintPosition[0]][paintPosition[1]] = value;
  }

  function findPossibleDirectionsToMove(position){
    let x = position[1];
    let y = position[0];
    let possibilitiesArray = []
    if(!(panel[y-1][x] === '#')) {
      possibilitiesArray.push([y-1,x]);
    }
    if(!(panel[y+1][x] === '#')) {
      possibilitiesArray.push([y+1,x]);
    }
    if(!(panel[y][x-1] === '#')) {
      possibilitiesArray.push([y,x-1]);
    }
    if(!(panel[y][x+1] === '#')) {
      possibilitiesArray.push([y,x+1]);
    }
    return possibilitiesArray
  }

  function isKey(char){
    let ascii = char.charCodeAt(0);
    if(ascii>=97 && ascii <=122){
      return true;
    } else {
      return false;
    }
  }
  function isDoor(char){
    let ascii = char.charCodeAt(0);
    if(ascii>=65 && ascii <=90){
      return true;
    } else {
      return false;
    }
  }

      let movementPossibilities;
      //do
      // fill this point with air
      // find possible places to spread
      if(isKey(panel[position[0]][position[1]]) || isDoor(panel[position[0]][position[1]])){
        foundItems.push([panel[position[0]][position[1]],stepsUntillNow,[position[0],position[1]]]);
      } 
        paint('#',position);
        movementPossibilities = findPossibleDirectionsToMove(position);
        if(movementPossibilities.length<=0){
          possiblePaths.push(foundItems.slice(0));
          return;
        } else {
          movementPossibilities.forEach(element=>{
            echo(possiblePaths,panel,element,stepsUntillNow+1,foundItems);
          });
        }
      
    // findFillingTime(startingPosition,panel.slice(0),0);
    // console.log(treeLengthLog.sort((a,b)=> a-b));
    // console.warn(treeLengthLog.pop());
  }

function findNextKeyPossibilities(nextKeyPossibilities,mazeArray,position,openDoorsArray,foundKeysArray,steps){
  let stepsUntillNow = steps;
  let panel = mazeArray;
  //console.warn('executing droid, starting position:', position, panel);
  let openDoors = openDoorsArray.slice(0);
  let foundKeys = foundKeysArray.slice(0);


  function paint(value,paintPosition = position){
    panel[paintPosition[0]][paintPosition[1]] = value;
  }

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

  function isKey(char){
    let ascii = char.charCodeAt(0);
    if(ascii>=97 && ascii <=122){
      return true;
    } else {
      return false;
    }
  }

      let movementPossibilities;
      //do
      // fill this point with air
      // find possible places to spread
      if(isKey(panel[position[0]][position[1]]) && !foundKeys.includes(panel[position[0]][position[1]])){
        nextKeyPossibilities.push([panel[position[0]][position[1]],stepsUntillNow,[position[0],position[1]]]);
        paint('*',position);
        return;
      } else {
        paint('*',position);
        movementPossibilities = findPossibleDirectionsToMove(position);
        if(movementPossibilities.length<=0){
          return;
        } else {
          movementPossibilities.forEach(element=>{
            findNextKeyPossibilities(nextKeyPossibilities,panel,element,openDoors.slice(0),foundKeys.slice(0),stepsUntillNow+1);
          });
        }
      }
    // findFillingTime(startingPosition,panel.slice(0),0);
    // console.log(treeLengthLog.sort((a,b)=> a-b));
    // console.warn(treeLengthLog.pop());
  }

    export function solveMaze(mazeInput,startingPosition = [40,40],numberOfTotalKeys = 26) {
      debugger;
      let treeLengthLog = [];
      let memoryArray = mazeInput.map(function(arr) {
        return arr.slice();
      });
      let mazeArray = mazeInput.map(function(arr) {
        return arr.slice();
      });
      // mazeArray[0][0] = '%';
      let possiblePaths = [];
      
      // debugger;
      // echo(possiblePaths,mazeArray,startingPosition,0,[]);
      // console.log(possiblePaths);
      // debugger;
      executeMazeRunner(mazeArray,startingPosition,['@'],[],0,numberOfTotalKeys,treeLengthLog,memoryArray);
      // let nextKeyPossibilities = []
      // debugger;
      // findNextKeyPossibilities(nextKeyPossibilities,mazeArray,startingPosition,['@'],[],0)
      // console.log(nextKeyPossibilities);
      debugger;
      console.log(treeLengthLog.sort((a,b)=> b-a));
      console.warn(treeLengthLog.pop());
      debugger;

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
    export function fillDeadEnds(mazeArray,startingPosition,lastKey,stepsUntillNow) {

      let doorToOpen = lastKey.toUpperCase();
      let maze = mazeArray;
      let existingDoors = []
      let existingKeys = []
      function findPossibleDirectionsToMove(position){
        let x = position[1];
        let y = position[0];
        let possibilitiesArray = []
        if(maze[y-1][x] === '#') {
          possibilitiesArray.push([y-1,x]);
        }
        if(maze[y+1][x] === '#') {
          possibilitiesArray.push([y+1,x]);
        }
        if(maze[y][x-1] === '#') {
          possibilitiesArray.push([y,x-1]);
        }
        if(maze[y][x+1] === '#') {
          possibilitiesArray.push([y,x+1]);
        }
        return possibilitiesArray
      }
      function isKey(char){
        let ascii = char.charCodeAt(0);
        if(ascii>=97 && ascii <=122){
          return true;
        } else {
          return false;
        }
      }
      function isDoor(char){
        try {
          if(typeof char === 'object') {
            char = char[0];
          }
          let ascii = char.charCodeAt(0);
          if(ascii>=65 && ascii <=90){
            return true;
          } else {
            return false;
          }
        } catch {
          console.log(char)
          debugger;
        }
      }
      let mazeY = maze.length;
      let mazeX = maze[0].length;
      let removedInStep;

      function removeDeadEndRun(maze){
        let removed = 0;
        for (var i=0; i<mazeY;i++){
          for(var j=0;j<mazeX;j++){
            if(maze[i][j]==='.' || isDoor(maze[i][j])){
              if(findPossibleDirectionsToMove([i,j]).length>=3 && !(i === startingPosition[0] && j === startingPosition[1])){
                maze[i][j] = '#';
                removed++;
              } else if(isDoor(maze[i][j]) && !existingDoors.includes(maze[i][j])) {
                existingDoors.push(maze[i][j]);
              } else if (isKey(maze[i][j]) && !existingKeys.includes(maze[i][j])){                
                existingKeys.push(maze[i][j]);
              }
            }
          }
        }
        return removed;
      }
      
      function removeKeyAndRenameDoor(char, to){
        let charDoor = char.toUpperCase()
        let doorIndex = existingDoors.indexOf(charDoor);
        existingDoors.splice(doorIndex,1);
        let keyIndex = existingKeys.indexOf(char);
        existingKeys.splice(keyIndex,1);
        for (var i=0; i<mazeY;i++){
          for (var j=0;j<mazeX;j++) {
            if(maze[i][j]=== char){
              maze[i][j] = '.';
            } else if (maze[i][j] === char.toUpperCase()){
              maze[i][j] = to.toUpperCase()
            }
          }
        }
      }
      
      function containsOnlyKeys(array){
        let foundDoor = false
        array.map(element =>{
          if (isDoor(element)){
            foundDoor = true;
          };
        });
        return !foundDoor;
      }
      
      function openDoor(char){
        for (var i=0; i<mazeY;i++){
          for (var j=0;j<mazeX;j++) {
            if(maze[i][j]=== char){
              maze[i][j] = '.';
            }
          }
        }
      }
      
      function removeOnlyKeys(element) {
        if(containsOnlyKeys(element)) {
          for (var i=0 ; i<element.length-1 ; i++) {
            //console.log(element[i],element[element.length-1])
            removeKeyAndRenameDoor(element[i],element[element.length-1])
          }
          return [element[element.length-1]];
        } else {
          return element;
        }
      }
      function removeBlockedPaths(possibilities) {
        let newArr = []
        possibilities.forEach(element=>{
          if(!isDoor(element[0])){
            newArr.push(element[0]);
          }
        })
        return newArr;
      }
      //Open the door from last key before doing anything
      openDoor(doorToOpen);
      // remove remaining deadends
      do{
        removedInStep = removeDeadEndRun(maze);
      } while (removedInStep>0);
      // echo to find tentacles
      let possiblePathArrays;
      possiblePathArrays = useEcho(maze,startingPosition,stepsUntillNow).possiblePathArrays;
      possiblePathArrays = possiblePathArrays.map(removeOnlyKeys); //vd
      let echo = useEcho(maze,startingPosition,stepsUntillNow);

      let possibilities = echo.possiblePaths;
      if(possibilities.length > 0 && possibilities[0].length > 0) {
      possibilities = removeBlockedPaths(possibilities);
      } else {
        possibilities = [];
      }
      return possibilities;
    }
    // function isBetter(position,steps,loot,)
    // const lockedDoors = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
