import { CardDeck } from "../helpers/CardDeck";

import {instructions} from '../consts/shuffleInstructions'

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