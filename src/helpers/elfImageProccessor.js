export 	function cutInputToLayers(input,layerX,layerY) {
  const layerStringLength = layerX*layerY;
  let inputArray = input.split('');
  let layersArray = [];

  layersArray = chunkString(input,layerStringLength);
  console.log(layersArray);

  console.log(findNumberOfCharInString('0', layersArray[0]));
  console.log(findNumberOfCharInString('0', layersArray[1]));
  console.log(getLayerWithFewest('0',layersArray))
  console.log(getMultiOfDigitsInLayer('1','2', getLayerWithFewest('0',layersArray)))

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
