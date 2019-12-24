export function bugsAfterTime(timeToRun){
  debugger
  //const firstStateArray = ['....#','#..#.','#..##','..#..','#....'].map(element=>element.split(''));
  const firstStateArray = ['##.##','#.##.','#...#','##.#.','####.'].map(element=>element.split(''));
  const emptyState = ['.....','.....','.....','.....','.....'].map(element=>element.split(''))

  let worldsArray = new Array(210);
  worldsArray.fill(emptyState.map(function(arr) {
    return arr.slice();
  }));
  worldsArray[103] = firstStateArray.map(function(arr) {
    return arr.slice();
  });

  let nextWorldStateArray = worldsArray.map(function(arr) {
    return arr.map(function(arr) {
      return arr.slice();
    });
  });
  let index = 0
  do {
    index++;

    nextWorldStateArray = stepWorlds(worldsArray,emptyState);
    console.log(worldsArray);
    console.log(nextWorldStateArray);
    worldsArray = nextWorldStateArray.map(function(arr) {
      return arr.map(function(arr) {
        return arr.slice();
      });
    });
  } while (index<timeToRun);

  console.log(worldsArray);
  console.warn(numOfBugsInWorld(worldsArray))
  debugger;

}


function stepWorlds(lastWorld,emptyState){


  let newWorld = lastWorld.map(function(arr) {
    return arr.map(function(arr) {
      return arr.slice();
    });
  });

  for(var i=0;i<lastWorld.length; i++){
    let arrayUp = i+1 === lastWorld.length ? emptyState : lastWorld[i+1];
    let arrayDown = i === 0 ? emptyState : lastWorld[i-1];
    newWorld[i] = stepBugs(lastWorld[i],arrayUp,arrayDown);
  }

  return newWorld;
}

function stepBugs(lastStepArray,arrayUp,arrayDown){
  let newArray = lastStepArray.map(function(arr) {
    return arr.slice();
  });
  let numOfBugs;
    for (var y = 0; y < 5; y++) {
      for (var x = 0; x < 5; x++) {
        numOfBugs = findNumberOfBugsAroundMe([y,x],lastStepArray,arrayUp,arrayDown);
        // console.log(numOfBugs,y,x)
        if(lastStepArray[y][x] === '#'){
          if(numOfBugs !== 1){
            newArray[y][x] = '.';
          }
        } else {
          if(numOfBugs === 1 || numOfBugs === 2){
            newArray[y][x] = '#';
          }
        }
      }
    }

  return newArray;
}

function findNumberOfBugsAroundMe(position,array,levelUp,levelDown){
  let x = position[1];
  let y = position[0];
  let bugs = 0
  if(y === 0) { //count one level up - [1,2]
    if(levelDown[1][2]==='#'){
      bugs++;
    }
  }
  if(y===4) { //count one level up = [3][2]
    if(levelDown[3][2]==='#'){
      bugs++;
    }
  }
  if(x===0) { //count one level up = [2][1]
    if(levelDown[2][1]==='#'){
      bugs++;
    }
  }
  if(x===4) { //count one level up = [2][3]
    if(levelDown[2][3]==='#'){
      bugs++;
    }
  }
  if(y-1 === 2 && x===2){ //check bottom of levelup
    bugs+= numberOfBugsOnBottom(levelUp);
  }else if(array[y-1] && array[y-1][x] === '#'){
    bugs++;
  }
  if(y+1 === 2 && x === 2){
    bugs+=numberOfBugsOnTop(levelUp);
  } else if (array[y+1] && array[y+1][x] === '#') {
    bugs++;
  }
  if(y === 2 && x-1 === 2){ //check right
    bugs+=numberOfBugsOnRight(levelUp);
  } else if (x-1>=0 && array[y][x-1] === '#') {
    bugs++;
  }
  if(y === 2 && x+1 === 2){ //check right
    bugs+=numberOfBugsOnLeft(levelUp);
  } else if(x+1 < 5 && array[y][x+1] === '#') {
    bugs++;
  }
  return bugs
}

function numberOfBugsOnLeft(array){
  let bugs = 0;
  let x = 0
  for (var y=0;y<5;y++){
    if(array[y][x] === '#'){
      bugs++;
    }
  }
  return bugs;
}
function numberOfBugsOnBottom(array){
  let bugs = 0;
  let y = 4
  for (var x=0;x<5;x++){
    if(array[y][x] === '#'){
      bugs++;
    }
  }
  return bugs;
}

function numberOfBugsOnTop(array){
  let bugs = 0;
  let y = 0
  for (var x=0;x<5;x++){
    if(array[y][x] === '#'){
      bugs++;
    }
  }
  return bugs;
}

function numberOfBugsOnRight(array){
  let bugs = 0;
  let x = 4
  for (var y=0;y<5;y++){
    if(array[y][x] === '#'){
      bugs++;
    }
  }
  return bugs;
}


function numOfBugs(array){
  let num = 0;
  for (var y = 0; y < 5; y++) {
    for (var x = 0; x < 5; x++) {
      if(!(x===2 && y ===2)){
      if(array[y][x] === '#'){
        num++
      }
    }

      }
    }
    return num;
}

function numOfBugsInWorld(world) {
  let res = 0;
  for(var i=0;i<world.length; i++){
    res+=numOfBugs(world[i]);
  }
  return res;

}