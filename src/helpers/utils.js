export function isLowerCase(char){
    let ascii = char.charCodeAt(0);
    if(ascii>=97 && ascii <=122){
      return true;
    } else {
      return false;
    }
}

export function isUpperCase(char){
  let ascii = char.charCodeAt(0);
  if(ascii>=65 && ascii <=90){
    return true;
  } else {
    return false;
  }
}

export function isArrayOfUndefinedOnly(array){
  const found = array.find(element => element !== undefined);
  return !found;
}

export function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function removeDups(names) {
  let unique = {};
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}