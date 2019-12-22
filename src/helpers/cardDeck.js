
export class CardDeck {

  constructor(config) {
    this.debugID = 'deck';
    this.startingDeck = config.deck;
    this.deck = config.deck;

  }

  dealIntoNewStack() {
    this.deck.reverse();
  }

  cut(n) {
    let order = n < 0;
    let absolute = Math.abs(n);
    let length = this.deck.length;
    let newArr;
    if(order) {
      newArr = this.deck.splice(length-absolute,absolute); //MUST TEST THIS
      this.deck = newArr.concat(this.deck);
    } else {
      newArr = this.deck.splice(0,absolute);
      this.deck = this.deck.concat(newArr);
    }
  }

  dealWithIncrement(increment){
    let originalDeck = this.deck.slice(0);
    let newArr = [];
    let pointer = 0;
    let index = 0;
    while (index < originalDeck.length){
      let num = originalDeck[index];
      if(newArr[pointer]){
        newArr.splice(pointer,0,num);
      } else {
        newArr[pointer] = num;
      }
      index++;
      pointer+=increment;
      pointer = pointer % (this.deck.length)
      //console.log(index,pointer,newArr)
    }

    this.deck = newArr;
  }


}
