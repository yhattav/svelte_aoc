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

  return JSON.stringify(a) === JSON.stringify(b);
  ;
}
