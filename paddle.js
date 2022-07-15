const computerPaddleSpeed=0.02

export default class paddle{
    constructor(paddleElm){
        this.paddleElm=paddleElm
        this.reset()
    }
    set position(value){
          this.paddleElm.style.setProperty('--position',value)
    }
    get position(){
        return parseFloat(getComputedStyle(this.paddleElm).getPropertyValue('--position'))
    }
    reset (){
        this.position=50
    }
    rect(){
        return this.paddleElm.getBoundingClientRect()
    }
  
    update(delta,ballHeight){
            this.position += computerPaddleSpeed * delta * (ballHeight - this.position)
    }

}