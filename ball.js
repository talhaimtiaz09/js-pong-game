const INTIAL_VELOCITY=0.025
const VELOCITY_INCREASE=0.0001
export default class Ball{
    constructor(ballElem){
        this.ballElem=ballElem
        this.reset()
    }
    get x(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--x'))
    }
    get y(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--y'))
    }
    set x(value){
        this.ballElem.style.setProperty('--x',value)
    }
    set y(value){
        this.ballElem.style.setProperty('--y',value)
    }
    rect (){
        return this.ballElem.getBoundingClientRect()
    }
    reset (){
        this.x=50
        this.y=50
        this.direction={x:0.2}
        while(Math.abs(this.direction.x)<=0.2 ||Math.abs(this.direction.x)>=0.9){
           const heading=randomNumberBetween(0,2*Math.PI)
           this.direction={x:Math.cos(heading),y:Math.sin(heading)}
        }
        this.velocity=INTIAL_VELOCITY

    }

    update(delta,paddleRects){
        this.x+=this.direction.x*this.velocity*delta
        this.y+=this.direction.y*this.velocity*delta
        this.velocity+=VELOCITY_INCREASE
        const ballRect=this.rect()
        
        if(ballRect.y>=window.innerHeight|| ballRect.y<=0)
            this.direction.y*=-1
        if(paddleRects.some(r=>isCollosion(r,ballRect)))
            this.direction.x*=-1
        
    }
}

function randomNumberBetween(min,max) {
   return Math.random()*(max-min)+min
}
function isCollosion(rect1,rect2){
        return (
            rect1.left <= rect2.right &&
            rect1.right >= rect2.left &&
            rect1.top <= rect2.bottom &&
            rect1.bottom >= rect2.top)
}