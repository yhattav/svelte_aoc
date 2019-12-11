export 	function cutInputToLayers(input,layerX,layerY) {
  const layerStringLength = layerX*layerY;
  let inputArray = input.split('');
  let layersArray = [];

  layersArray = chunkString(input,layerStringLength);
  console.log(layersArray);

  // console.log(findNumberOfCharInString('0', layersArray[0]));
  // console.log(findNumberOfCharInString('0', layersArray[1]));
  // console.log(getLayerWithFewest('0',layersArray))
  // console.log(getMultiOfDigitsInLayer('1','2', getLayerWithFewest('0',layersArray)))

  return layersArray;
}

function chunkString(str, length) {
  return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

function findNumberOfCharInString(char,str) {
  const regEx = new RegExp(char, 'g')
  let matches = str.match(regEx)
  return (matches || []).length;
}

function getLayerWithFewest(char,layersArray) {
  let highestLayer;
  let highestNumberOfChar = Infinity;
  let numberOfChars

  layersArray.map(element=>{
    numberOfChars = findNumberOfCharInString(char,element);
    if(numberOfChars < highestNumberOfChar){
      highestNumberOfChar = numberOfChars;
      highestLayer = element;
    }
  });
  console.warn('found highest layer with 0',highestNumberOfChar, highestLayer)
  return highestLayer;
}

function getMultiOfDigitsInLayer(charA,charB,layer) {
  const numberOfCharsA = findNumberOfCharInString(charA,layer);
  const numberOfCharsB = findNumberOfCharInString(charB,layer);
  console.log(numberOfCharsA,numberOfCharsB);
  return numberOfCharsA*numberOfCharsB;
};

export function printImage(input,layerX,layerY) {
  const layerStringLength = layerX*layerY;
  let layersArray = [];
  let imageRes = [[],[],[],[],[],[]];
  let count = 0;
  layersArray = chunkString(input,layerStringLength);
  console.log(layersArray);
  let shouldKeepGoing = true;
  let layerIndex = 0
  for (var y=0;y<layerY;y++){
    for (var x=0;x<layerX;x++){
      layersArray.forEach(element=>{
        console.log(x);
        if (imageRes[y][x] === '0' || imageRes[y][x] === '1'){
          console.log(x,y,imageRes[y][x])
          return;
        } else {
          console.log(element[count]);
          imageRes[y][x] = element[count];
        }
      })
      count++
      console.log(count)




  }
}

  console.warn(imageRes)
  return{
    lineA: imageRes[0],
    lineB: imageRes[1],
    lineC: imageRes[2],
    lineD: imageRes[3],
    lineE: imageRes[4],
    lineF: imageRes[5],
  }
}