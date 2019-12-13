
export class Moon {

  constructor(config) {
    this.debugID = 'Moon-0'
    this.compId = config.compId;
    this.currentStep = 0;
    this.position = config.position;
    this.initialPosition = config.position;
    this.numberOfSiblings = config.numberOfSiblings;
    this.nextPosition = {};
    this.sinusXfound = false
    this.sinusYfound = false
    this.sinusZfound = false
    this.sinusX = 0;
    this.sinusY = 0;
    this.sinusZ = 0;
    this.firstStepDelta = {}
    this.velocityDeltaSum= {
      x:0,
      y:0,
      z:0,
    }
    this.velocity = {
      x:0,
      y:0,
      z:0,
    }
    this.pastPositions=[];
    this.positionsLog={
      x: [],
      y: [],
      z: [],
    };
    this.sinusPositionLog={
      x: [],
      y: [],
      z: [],
    };
    this.nextVelocity={};
    this.velocitySum={
      x:0,
      y:0,
      z:0,
    }
    this.positionSum={
      x:0,
      y:0,
      z:0,
    }
  }


  calcNextVelocity(siblingPositions){
    let deltaX=0;
    let deltaY=0;
    let deltaZ=0;
    const {x,y,z} = this.position;
    siblingPositions.forEach(element=>{
      deltaX += this.calcVelocityDelta(x,element.x)
      deltaY += this.calcVelocityDelta(y,element.y)
      deltaZ += this.calcVelocityDelta(z,element.z)
    })
    const res = {
      x: this.velocity.x+deltaX,
      y: this.velocity.y+deltaY,
      z: this.velocity.z+deltaZ,
    }
    //if (this.compId === this.debugID) console.log('>>>>>>>>>>>>>>>>', this.position.z, this.currentStep);
    this.nextVelocity = res;
    return {
      x:deltaX,
      y:deltaY,
      z:deltaZ,
    }
  }

  calcVelocityDelta(selfValue,siblingValue){
    let value; //TODO check correct run
    if(selfValue === siblingValue){
      return 0;
    } else if (selfValue<siblingValue){
      return 1;
    } else {
      return -1;
    }
  }

  getPosition(){
    return this.position;
  }
  getVelocity(){
    return this.velocity;
  }

  getEnergy(){
    let pot;
    let kin;
    pot = Math.abs(this.position.x) + Math.abs(this.position.y) + Math.abs(this.position.z);
    kin = Math.abs(this.velocity.x) + Math.abs(this.velocity.y) + Math.abs(this.velocity.z);
    console.log(this.compId, pot*kin);
    return pot*kin;
  }
  calcNextPosition(){
    this.nextPosition.x = this.position.x + this.nextVelocity.x;
    this.nextPosition.y = this.position.y + this.nextVelocity.y;
    this.nextPosition.z = this.position.z + this.nextVelocity.z;
  }
  isPatternX(length){
    if(length%2 === 0){
      if (this.arraysEqual(this.positionsLog.x.slice(0,length/2-1),this.positionsLog.x.slice(length/2,length-1))){
        return true;
      }
    };
    return false;
  }
  isPatternY(length){
    if(length%2 === 0){
      if (this.arraysEqual(this.positionsLog.y.slice(0,length/2-1),this.positionsLog.y.slice(length/2,length-1))){
        return true;
      }
    };
    return false;
  }
  isPatternZ(length){
    if(length%2 === 0){
      if (this.arraysEqual(this.positionsLog.z.slice(0,length/2-1),this.positionsLog.z.slice(length/2,length-1))){
        return true;
      }
    };
    return false;
  }

  arraysEqual(a, b) {
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

  step(siblingPositions){
    let xIndex
    // if(this.velocitySum.y === 0) {this.sinusY = this.sinusYfound ? 0 : this.currentStep; this.sinusYfound = true; console.warn('found sinus point for y:', this.currentStep);}
    // if(this.velocitySum.z === 0) {this.sinusZ = this.sinusZfound ? 0 : this.currentStep; this.sinusZfound = true; console.warn('found sinus point for z:', this.currentStep);}
    let velocityDelta = this.calcNextVelocity(siblingPositions);
    if(this.currentStep===0) this.firstStepDelta = velocityDelta;
    this.calcNextPosition();
    this.pastPositions.push(this.position);
    this.positionsLog.x.push(this.position.x);
    this.positionsLog.y.push(this.position.y);
    this.positionsLog.z.push(this.position.z);
    this.sinusPositionLog.x.push(this.position.x)
    if(!(this.currentStep===0))
    {
         if(this.velocitySum.x === 0 && velocityDelta.x===this.firstStepDelta.x && this.initialPosition.x === this.nextPosition.x) {
            if(this.isPatternX(this.currentStep+1)){
            this.sinusX = this.sinusXfound ? this.sinusXfound : (this.currentStep+1)/2; 
            this.sinusXfound = this.sinusX; 
            // if(this.compId===this.debugID) debugger;
            //this.sinusXfound && this.compId===this.debugID && console.warn('found sinus point for x:', this.currentStep);
          }
          }
          if(this.velocitySum.y === 0 && velocityDelta.y===this.firstStepDelta.y && this.initialPosition.y === this.nextPosition.y) {
            if(this.isPatternY(this.currentStep+1)) {
            this.sinusY = this.sinusYfound ? this.sinusYfound : (this.currentStep+1)/2; 
            this.sinusYfound = this.sinusY; 
            //this.sinusYfound && this.compId===this.debugID && console.warn('found sinus point for y:', this.currentStep);
          }
        }
          if(this.velocitySum.z === 0 && velocityDelta.z===this.firstStepDelta.z && this.initialPosition.z === this.nextPosition.z) {
            if(this.isPatternZ(this.currentStep+1)) {
            this.compId===this.debugID && console.warn('possible for z:', this.currentStep, this.velocityDeltaSum.z);
            this.sinusZ = this.sinusZfound ? this.sinusZfound : (this.currentStep+1)/2; 
            this.sinusZfound = this.sinusZ; 
            this.sinusZfound && this.compId===this.debugID && console.warn('found sinus point for z:', this.currentStep);
            }
          }
      if(this.position.x === this.initialPosition.x) {
        xIndex = this.currentStep;
      }
  }
    this.position = this.nextPosition;
    this.velocity = this.nextVelocity;
    this.velocitySum.x+=this.nextVelocity.x;
    // if (this.compId === this.debugID){
    // console.log(this.velocitySum.x)
    // }
    this.velocitySum.y+=this.nextVelocity.y;
    this.velocitySum.z+=this.nextVelocity.z;
    this.positionSum.x+=this.nextPosition.x;
    this.positionSum.y+=this.nextPosition.y;
    this.positionSum.z+=this.nextPosition.z;
    this.velocityDeltaSum.x+=velocityDelta.x;
    this.velocityDeltaSum.y+=velocityDelta.y;
    this.velocityDeltaSum.z+=velocityDelta.z;
    this.nextVelocity = {};
    this.nextPosition = {};
    
    this.currentStep++;
    if(this.sinusXfound && this.sinusYfound && this.sinusZfound){
      //console.warn(this.compId, '>>>>>>>>>>>>>>>>>>>>>', this.sinusX,this.sinusY,this.sinusZ);
      return [this.sinusX,this.sinusY,this.sinusZ];
    } else return false;
  }


}
