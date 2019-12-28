import {isUpperCase,isLowerCase,isArrayOfUndefinedOnly,arraysEqual,removeDups} from '../helpers/utils'
import jKstra from 'jKstra'

function dijkkstraToShortest(distances,uniquePortals){
var graph = new jKstra.Graph();

var n = []; // to easily keep references to the node objects

uniquePortals.forEach((element,index)=>{
  n.push(graph.addVertex(element));
});

console.log(n[3].data); // => 3
console.log(n[5].data); // => {id: 666, label: 'A node holding complex data'}


distances.forEach((elementY,indexY)=>{
  elementY.map((elementX,indexX)=>{
    if(elementX){
      graph.addEdge(n[indexY], n[indexX], elementX)
    }
  })
})
// graph.addEdge(n[0], n[1], 7);   // The edges are directed. Here, only the edge from 0 to 1 is created.
// graph.addEdgePair(n[0], n[2], 9);   // But two opposite edges sharing the same data can be easily created
// graph.addEdge(n[0], n[5], 14);
// graph.addEdge(n[1], n[2], 10);
// graph.addEdge(n[1], n[3], 15);
// graph.addEdge(n[2], n[5], 2);
// graph.addEdge(n[2], n[3], 12);  // As for the nodes, you can assign any data to the edge.
// graph.addEdge(n[3], n[4], 6);   // Here we use it to store a single value which will be used as a cost.
// graph.addEdge(n[5], n[4], 10);

// you can access edges from nodes with the outEdges/inEdges function
console.log(graph.outEdges(n[5]).map(function(e) { return e.data; }).join());
// => [10]

var dijkstra = new jKstra.algos.Dijkstra(graph);

// computes the shortestPath between nodes 0 and 4,
// using the single number stored in each as its cost
var path = dijkstra.shortestPath(n[0], n[n.length-1], {
    edgeCost: function(e) { return e.data; }
});

// the result is an array of the edge objects that make the path
console.log(path.map(function(e) { return e.data; }).join());
console.log(path.map(function(e) { return e.data; }).reduce((a, b) => a + b, 0))
console.log(path);
debugger;
return path.map(function(e) { return e.data; }).reduce((a, b) => a + b, 0)
}

function isUpperCaseSingleChar(char){
  return char.length === 1 && isUpperCase(char);
}

function isPortal(str){
  return str.length === 2;
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

  function mapDistances(maze,distances,portalPosition,uniquePortals){
    debugger;
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
  }
}

    export function solveMaze(mazeInput,startingPosition = [40,40],numberOfTotalKeys = 26) {
      let treeLengthLog = [];

      let mazeArray = mazeInput.map(function(arr) {
        return arr.slice();
      });
      let mazeY = mazeArray.length;
      let cache = new Array(mazeY);
      cache.fill([]);

      let portalPositions = []
        let blockings = new Array(26);
        let keyPath = [0];
        
        let possiblePaths = []
        fillDeadEndsAndLogPossitions(mazeArray,startingPosition,portalPositions) // mutating the array.
        let portalNames = portalPositions.map(element=>element[0]);
        let uniquePortals = removeDups(portalNames).sort((a, b) => a.localeCompare(b))
        let distances = new Array(uniquePortals.length);
      mapDistances(mazeArray,distances,portalPositions,uniquePortals);
  
      debugger;
      // let shortest = dijkkstraToShortest(distances,uniquePortals)
      findMazeEnd(3,distances.slice(),uniquePortals.slice())
      // let shortestDistance = getDistanceToCollectKeys(startingPosition,undefined,blockings,keyPositions,distances,cache,keyPath)
      //retreive the possible steps to them.
      console.warn('ANSWER TO PART 1:',shortest-1) // to get to the front of the portal....
      debugger;
      // for each, go and retreive the possible steps for them (remove the doors); if no more possibilities return the steps sum

      console.log(treeLengthLog.sort((a,b)=> b-a));
      let res = treeLengthLog.pop()
      console.warn(res);
      return shortest-1;
    }


function findMazeEnd(num,distances,uniquePortals){

  debugger;
  travel = new Set()
  travel.add('AA:O', 0);

  function BFS(current, distances, floor){

    let options = findOptions(distances)

    options.forEach(element=>{
      let nextFloor;
      if (isOuter()) nextFloor = floor-1;
      if (isInner()) nextFloor = floor+1;
      if (viable){
        travel.add(element, nextFloor);
      }

    });

    travel.remove(current)
  

  }

  for (const [name,floor] of travel){

    BFS(name,distances,floor);
  }
}
