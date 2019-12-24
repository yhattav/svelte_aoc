export function findFirstMatch(){
  debugger
  // const firstStateArray = ['....#','#..#.','#..##','..#..','#....'].map(element=>element.split(''));
  const firstStateArray = ['##.##','#.##.','#...#','##.#.','####.'].map(element=>element.split(''));


  let lastStateArray = firstStateArray.map(function(arr) {
      return arr.slice();
    });
  let nextStateArray = firstStateArray.map(function(arr) {
      return arr.slice();
    });
  let stateList = [bugsToString(firstStateArray)];
  let stringFromState
  let foundMatch
  let index = 0
  do {
    index++;
    nextStateArray = stepBugs(lastStateArray);
    console.log(nextStateArray);
    stringFromState = bugsToString(nextStateArray);
    outputBiodiversity(stringFromState);

    foundMatch = stateList.includes(stringFromState);
    stateList.push(stringFromState)
    lastStateArray = nextStateArray.map(function(arr) {
      return arr.slice();
    });
  } while (!foundMatch && index < 1000);


  console.log(stringFromState,index);
  outputBiodiversity(stringFromState);
  debugger;

}

function outputBiodiversity(stateStrig){
  let array = stateStrig.split('');
  let res = 0;

  array.map((element,index)=>{
    if(element === '1'){
      res+=Math.pow(2,index);
    }
  });

  console.warn(res);
  console.warn(Math.log2(res))
}
function bugsToString(array){
  let string = '';
  for (var y = 0; y < 5; y++) {
    for (var x = 0; x < 5; x++) {
      
      if(array[y][x] === '#'){
        string +='1'
      } else {
        string += '0'
      }

      }
    }
    return string;
}

const primeMap = [
                  [3,5,7,11,13],
                  [17,19,23,29,31],
                  [37,41,43,47,53],
                  [59,61,67,71,73],
                  [79,83,89,97,101],
                ];

const bugsInputArray = []


function stepBugs(lastStepArray){
  let newArray = lastStepArray.map(function(arr) {
    return arr.slice();
  });
  let numOfBugs;
    for (var y = 0; y < 5; y++) {
      for (var x = 0; x < 5; x++) {
        if(!(y===2 && x===2)){
          numOfBugs = findNumberOfBugsAroundMe([y,x],lastStepArray);
          console.log(numOfBugs,y,x)
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
    }

  return newArray;
}

function findNumberOfBugsAroundMe(position,array){
  let x = position[1];
  let y = position[0];
  let bugs = 0
  if(array[y-1] && array[y-1][x] === '#') {
    bugs++;
  }
  if(array[y+1] && array[y+1][x] === '#') {
    bugs++;
  }
  if(x-1>=0 && array[y][x-1] === '#') {
    bugs++;
  }
  if(x+1 < 5 && array[y][x+1] === '#') {
    bugs++;
  }
  return bugs
}