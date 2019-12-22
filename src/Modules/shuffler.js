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
}

export function extremeShuffle(numberOfCards,timesToShuffle,lookForIndex){
  let instructionsStringArray = instructions.reverse();
  let array = [2020]
  for (var i=1; i <= timesToShuffle ; i++){
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
    if(lookForIndex === 2020){
      debugger;
    }
    //console.warn(lookForIndex - array[i-1])
    //console.warn(lookForIndex);
    //console.warn(lookForIndex / numberOfCards);
  }
  debugger;

}