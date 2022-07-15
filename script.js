import Ball  from "./ball.js";
import paddle from "./paddle.js";
let ball=new Ball(document.getElementById('ball'))
let playerPaddle= new paddle(document.getElementById('player-paddle'))
let computerPaddle= new paddle(document.getElementById('computer-paddle'))
let playerScoreElm=document.getElementById('player-score')
let computerScoreElm=document.getElementById('computer-score')
let lastTime
function  update(time) {
    if(lastTime!=null){
        const delta=time-lastTime
        let hue=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'))
        ball.update(delta,[playerPaddle.rect(),computerPaddle.rect()])
        computerPaddle.update(delta,ball.y)
        document.documentElement.style.setProperty('--hue',hue+=(delta*0.009))
}
if(isLose())
    handleLose()
lastTime=time;
window.requestAnimationFrame(update)
}
function isLose(){
    const ballRect=ball.rect()
    if(ballRect.right>=window.innerWidth|| ballRect.left<=0)
        return true
    else
        return false
}

function handleLose(){
    const ballRect=ball.rect()
    if(ballRect.right>=window.innerWidth)
        playerScoreElm.textContent= parseInt(playerScoreElm.textContent)+1
    else
        computerScoreElm.textContent= parseInt(computerScoreElm.textContent)+1
    ball.reset()
    playerPaddle.reset()
    computerPaddle.reset()
}
document.addEventListener('mousemove',move=>{
    playerPaddle.position=(move.y/window.innerHeight)*100

})
window.requestAnimationFrame(update)