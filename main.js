const player = {
    gameover: true
}

const container = document.querySelector('.container');
let contDim = container.getBoundingClientRect();

const gameover = document.createElement('div');
gameover.textContent = "Start Game";
gameover.style.position = "absolute";
gameover.style.color = "white";
gameover.style.lineHeight = "300px";
gameover.style.fontSize = "3rem";
gameover.style.textTransform = "uppercase";
gameover.style.width = "80vw";
gameover.style.backgroundColor = "red";
gameover.style.textAlign = "center";
gameover.addEventListener('click', startGame);

container.appendChild(gameover);

const ball = document.createElement('div');
ball.style.position = "absolute";
ball.style.width = "20px";
ball.style.height = "20px";
ball.style.backgroundColor = "gainsboro";
ball.style.borderRadius = "25px";
ball.style.backgroundImage = "url(Smash_Ball.png)";
ball.style.backgroundSize = "20px 20px";
ball.style.top = "645px";
ball.style.display = "none";
ball.style.left = "49.6%";
container.appendChild(ball);

const paddle = document.createElement('div');
paddle.style.position = "absolute";
paddle.style.backgroundColor = "white";
paddle.style.width = "120px";
paddle.style.height = "13px";
paddle.style.borderRadius = "25px";
paddle.style.bottom = "20px";
paddle.style.left = "46.5%";
container.appendChild(paddle);

document.addEventListener('keydown',  function (e) {
    // console.log(e.key);
    // console.log(e.keyCode);
    if(e.key !== undefined) {
        if(e.key === 'a' || e.key === 'ArrowLeft') 
            paddle.left = true;
        if(e.key === 'd' || e.key === 'ArrowRight')
            paddle.right = true;
    } else if(e.keyCode !== undefined) {
        if(e.keyCode === '65' || e.key === '37')
            paddle.left = true;
        if(e.keyCode === '68' || e.key === '39')
            paddle.right = true;
    }
})

document.addEventListener('keyup', function (e) {
    if (e.key !== undefined) {
        if (e.key === 'a' || e.key === 'ArrowLeft')
            paddle.left = false;
        if (e.key === 'd' || e.key === 'ArrowRight')
            paddle.right = false;
    } else if (e.keyCode !== undefined) {
        if (e.keyCode === '65' || e.key === '37')
            paddle.left = false;
        if (e.keyCode === '68' || e.key === '39')
            paddle.right = false;
    }
})

window.onresize = function (event) {
    contDim = container.getBoundingClientRect();
}

function startGame() {
    console.log('Game Started');
    if(player.gameover) {
        player.gameover = false;
        gameover.style.display = 'none';
        window.requestAnimationFrame(update);
    }
}

function update() {
    let currentPaddlePos = paddle.offsetLeft;
    if(paddle.left) {
        if(currentPaddlePos >= contDim.left)
            currentPaddlePos -= 10;
    }
    if(paddle.right)
        if(currentPaddlePos <= (contDim.right - paddle.offsetWidth - 20))
            currentPaddlePos += 10;
    paddle.style.left = currentPaddlePos + 'px';
    window.requestAnimationFrame(update);
}
// var start = null;

// function step(timestamp) {
//     if (!start) start = timestamp;
//     var progress = timestamp - start;
//     container.style.left = Math.min(progress / 10, 200) + "px";
//     if (progress < 2200) {
//         console.log(start);
//         window.requestAnimationFrame(step);
//     }
// }
