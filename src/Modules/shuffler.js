import { CardDeck } from "../helpers/CardDeck";

import {instructions} from '../consts/shuffleInstructions'
import { intros } from "svelte/internal";

function createDeck(numberOfCards) {

  let deck = Array.from(Array(numberOfCards).keys());
  let cardDeck = new CardDeck({deck});
  return cardDeck

}
export function shuffle(numberOfCards,timesToShuffle){

  let instructionsStringArray = instructions//['deal with increment 7','deal into new stack','deal into new stack']
  let spaceDeck = createDeck(numberOfCards);

  for (var i=0; i < timesToShuffle ; i++){

  instructionsStringArray.map(element=>{
    if (element.includes('deal with increment')){
      let num = Number(element.slice(20,element.length));
      spaceDeck.dealWithIncrement(num);
    } else if (element.includes('deal into new stack')){
      spaceDeck.dealIntoNewStack();
    } else if (element.includes('cut')){
      let num = Number(element.slice(4,element.length));
      spaceDeck.cut(num);
    }
  });
  }

  console.warn(spaceDeck.deck);
  console.warn(spaceDeck.deck.findIndex(element=>element === 2019));
  // console.log((119315717514047 - 101741582076661) / 10007);
  // console.log((119315717514047 / 8455));
}

export function newShuffle(numberOfCards,timesToShuffle){
  function xgcd(a, b) { 
  let temp,x,y,d
    if (b == 0) {
      return [1, 0, a];
    }

    temp = xgcd(b, a % b);
    x = temp[0];
    y = temp[1];
    d = temp[2];
    return [y, x-y*Math.floor(a/b), d];
  }
  let instructionsStringArray = instructions//['deal with increment 7','deal into new stack','deal into new stack']
  let spaceDeck = createDeck(numberOfCards);
  let inc = 8455;
  console.warn(inc);
  let cut = 7839*timesToShuffle;
  console.warn(cut);
  inc = (numberOfCards-1)*1618;
  console.log(inc);
  cut = cut % numberOfCards;
  console.log(cut);
  spaceDeck.cut(cut);
  spaceDeck.dealWithIncrement(inc);

  // for (var i=0; i < timesToShuffle ; i++){

  // instructionsStringArray.map(element=>{
  //   if (element.includes('deal with increment')){
  //     let num = Number(element.slice(20,element.length));
  //     inc+=num;
  //     spaceDeck.dealWithIncrement(num);
  //   } else if (element.includes('deal into new stack')){
  //     spaceDeck.dealIntoNewStack();
  //   } else if (element.includes('cut')){
  //     let num = Number(element.slice(4,element.length));
  //     cut+=num;
  //     spaceDeck.cut(num);
  //   }
  // });
  // }
  console.log('cut', cut)
  console.log('inc', inc)
  console.warn(spaceDeck.deck);
  console.warn(spaceDeck.deck.findIndex(element=>element === 2019));
  // console.log((119315717514047 - 101741582076661) / 10007);
  // console.log((119315717514047 / 8455));
}

export function extremeShuffle(numberOfCards,timesToShuffle,lookForIndex){
  let instructionsStringArray = instructions.reverse();
  let inc = 8455*timesToShuffle;
  console.warn(inc);
  let cut = 7839*timesToShuffle;
  console.warn(cut);
  let lastIndex = lookForIndex
  let array = []
  // for (var i=1; i <= timesToShuffle ; i++){
    instructionsStringArray.map(element=>{

      if (element.includes('deal with increment')){
        let num = Number(element.slice(20,element.length));
        
        //lookForIndex = (lookForIndex * num ) % numberOfCards;

        let keepLooking = true
        let index = 0;
        while (keepLooking && (index<=numberOfCards)){
          if(((index*numberOfCards+lookForIndex) % num) === 0){
            lookForIndex = (index*numberOfCards+lookForIndex) / num;
            keepLooking = false;
          }
          index++;
        }

      } else if (element.includes('deal into new stack')){

        lookForIndex = (numberOfCards - 1 ) - lookForIndex;

      } else if (element.includes('cut')){
        let num = Number(element.slice(4,element.length));

        lookForIndex += num;

        if(lookForIndex >= numberOfCards) {
          lookForIndex = lookForIndex % numberOfCards;
        } else if (lookForIndex < 0) {
          lookForIndex += numberOfCards;
        }
      }

    })
    // console.warn((lookForIndex / numberOfCards).toFixed(2))
    if(lookForIndex === lastIndex){
      debugger;
    }
    //console.warn(lookForIndex - array[i-1])
    console.warn(lookForIndex);
    //console.warn(lookForIndex / numberOfCards);
  // }
  console.log(lookForIndex)
  debugger;

}



function transform(start, step, size){

let instructionsStringArray = instructions//['deal with increment 7','deal into new stack','deal into new stack']

instructionsStringArray.map(element=>{
  if (element.includes('deal with increment')){
    let num = Number(element.slice(20,element.length));
    step = (step * BigInt(Math.pow(num, size - 2, size))) % size
debugger;
  }  else if (element.includes('cut')){
    let num = Number(element.slice(4,element.length));
    if (num < 0){
      num += size
    }
    start = (start + step * num) % size
  
}});

    return {start, step}

}


function repeat(start, step, size, repetitions){

    let final_step = Math.pow(step, repetitions, size)
    let final_start = (start * (1 - final_step) * BigInt(Math.pow(1 - step, size - 2, size))) % size

    return {start:final_start, step:final_step}
}


export function hardShuffle(){

let  start = 0
let step = 1
let size = 119315717514047
let repetitions = 101741582076661

let afterOne = transform(start, step, size, instructions)

start = afterOne.start;
step = afterOne.step;
let afterRepete = repeat(start, step, size, repetitions);

start = afterRepete.start;
step = afterRepete.step;

debugger;
}

// const l = console.log

// let input = instructions;

// function solve3(input, size, x, rep = 1) {
//   let [a, b] = input.reduceRight(([a, b], line) => A.caseParse(line,
//     [/new stack/, () => [(size - a) % size, (size + size - b - 1) % size]],
//     [/increment (\S+)/, aa => [ modDiv(a, aa, size), modDiv(b, aa, size) ]],
//     [/cut (\S+)/, bb => [ a, ((b + bb) %size + size )% size] ],
//   ), [1, 0]);
//   while (rep) {
//     if (rep % 2) x = (mulMod(x,a,size) + b) % size;
//     [a, b] = [mulMod(a,a,size), (mulMod(a,b,size) + b) % size];
//     rep = Math.floor(rep / 2);
//   }
//   return x;
// }
// l(solve3(input, 119315717514047, 2020, 101741582076661));

function gcdExtended(a, b) {
  let x = 0, y = 1, u = 1, v = 0;
  while (a !== 0) {
    let q = Math.floor(b / a);
    [x, y, u, v] = [u, v, x - u * q, y - v * q];
    [a, b] = [b % a, a];
  }
  return [b, x, y];
}
function modInverse(a, m) {
  const [g, x] = gcdExtended(a, m);
  if (g !== 1) throw('Bad mod inverse')
  return (x + m) % m;
}
function modDiv(a, b, m) {
  return Number(BigInt(a) * BigInt(modInverse(b, m)) % BigInt(m));
}
function mulMod(a,b,m) {
  return Number(BigInt(a) * BigInt(b) % BigInt(m))
}



// the python code i ended up using in an online int:

// DEAL_NEW, DEAL_INC, CUT = 1, 2, 3
// def createMoves():
//   fin = ['cut 8808','deal with increment 59','deal into new stack','deal with increment 70','cut -5383','deal with increment 4','deal into new stack','cut 9582','deal with increment 55','cut -355','deal with increment 61','deal into new stack','cut -6596','deal with increment 8','cut 4034','deal with increment 37','cut -8183','deal with increment 16','cut 9529','deal with increment 24','cut -7751','deal with increment 15','cut -8886','deal with increment 17','deal into new stack','cut -1157','deal with increment 74','cut -6960','deal with increment 49','cut 9032','deal with increment 47','cut 8101','deal with increment 59','cut -8119','deal with increment 35','cut -2017','deal with increment 10','cut -4431','deal with increment 47','cut 5712','deal with increment 18','cut 4424','deal with increment 69','cut 5382','deal with increment 40','cut -4266','deal with increment 58','cut -8911','deal with increment 24','cut 8231','deal with increment 74','cut -2055','deal into new stack','cut -1308','deal with increment 31','deal into new stack','deal with increment 18','cut 4815','deal with increment 5','deal into new stack','cut 1044','deal with increment 75','deal into new stack','deal with increment 13','cut 177','deal into new stack','deal with increment 28','cut 5157','deal with increment 31','deal into new stack','cut -8934','deal with increment 50','cut 4183','deal with increment 50','cut 1296','deal with increment 5','cut -5162','deal with increment 52','deal into new stack','cut -5207','deal with increment 30','cut -2767','deal with increment 71','deal into new stack','cut 5671','deal with increment 67','cut 4818','deal with increment 35','cut 9234','deal with increment 58','cut -8832','deal with increment 72','cut 1289','deal with increment 55','cut -8444','deal into new stack','deal with increment 19','cut -5512','deal with increment 29','cut 3680']
//   moves = []
//   for l in fin:
//     if 'deal into' in l:
//         moves.append((DEAL_NEW, 0))
//     elif 'deal with' in l:
//         n = int(l[l.rfind(' '):])
//         moves.append((DEAL_INC, n))
//     elif 'cut' in l:
//         n = int(l[l.rfind(' '):])
//         moves.append((CUT, n))

//   return moves


// def transform(start, step, size):
//     moves = createMoves()
//     for move, n in moves:
//         if move == DEAL_NEW:
//             start = (start - step) % size
//             step = -step % size
//         elif move == DEAL_INC:
//             step = (step * pow(n, size - 2, size)) % size
//         elif move == CUT:
//             if n < 0:
//                 n += size

//             start = (start + step * n) % size

//     return start, step


// def repeat(start, step, size, repetitions):
//     final_step = pow(step, repetitions, size)
//     final_start = (start * (1 - final_step) * pow(1 - step, size - 2, size)) % size

//     return final_start, final_step



// start, step, size = 0, 1, 119315717514047
// repetitions = 101741582076661

// start, step = transform(start, step, size)
// print(step,start)
// start, step = repeat(start, step, size, repetitions)
// print(step,start)
// value = (start + step * 2020) % size
// print('Part 2:', value)