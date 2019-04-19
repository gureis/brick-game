const player = {
    gameover: true,
    highScore: 0
}
let totalBricks = 30;
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
ball.style.top = "640px";
ball.style.display = "none";
ball.style.left = "49.6%";
ball.style.animation = "spin 4s linear infinite";
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
        player.score = 0;
        player.lives = 1;
        ball.style.display = 'block';
        ball.style.top = paddle.offsetTop - 30 + "px";
        ball.style.left = paddle.offsetLeft + 50 + "px";
        player.ballDir = [10, -5];
        setupBricks(totalBricks);
        updateScoreAndLives();
        window.requestAnimationFrame(update);
    }
}

function update() {
    if(!player.gameover) {
        let currentPaddlePos = paddle.offsetLeft;
        if(paddle.left) {
            if(currentPaddlePos >= (7))
                currentPaddlePos -= 10;
        }
        if(paddle.right)
            if(currentPaddlePos <= (contDim.width - paddle.offsetWidth - 10))
                currentPaddlePos += 10;
        paddle.style.left = currentPaddlePos + 'px';
        moveBall();
        window.requestAnimationFrame(update);
    }
}

function setupBricks(bricks) {
    const defaultX = ((contDim.width % 120) / 2);
    let row = {
        x: defaultX,
        y: (contDim.top + 10)
    }
    let skip = false;
    for(let i = 0; i < bricks; i++) {
        if(row.x > (contDim.width - 120)) {
            row.y += 70;
            if(row.y > (contDim.height/2))
                skip = true;
            row.x = defaultX;
        }
        row.num = i;
        if(!skip)
            createBrick(row);
        row.x += 120;
    }
}

function createBrick(pos) {
    const div = document.createElement('div');
    div.setAttribute('class', 'brick');
    div.style.backgroundColor = randomColor();
    div.textContent = pos.num + 1;
    div.style.left = pos.x + 'px';
    div.style.top = pos.y + 'px';
    container.appendChild(div);
}

function isCollide(a, ball) {
    let aRect = a.getBoundingClientRect();
    let bRect = ball.getBoundingClientRect();
    return !((aRect.right < bRect.left) || (aRect.left > bRect.right) 
            || (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom));
    }

function randomColor() {
    return '#' + Math.random().toString(16).substr(-6);
}

function updateScoreAndLives() {
    document.querySelector('.score').textContent = player.score;
    document.querySelector('.lives').textContent = player.lives;
    if (player.score > player.highScore) {
        player.highScore = player.score;
    }
    document.querySelector('.high-score').textContent = player.highScore
}

function endGame() {
    gameover.style.display = 'block';
    gameover.innerHTML = 'Game Over <br> Your Score: ' + player.score;
    player.gameover = true;
    let tempBricks = document.querySelectorAll('.brick');
    ball.style.display = "none";
    for(let brick of tempBricks) {
        brick.parentNode.removeChild(brick);
    }
    totalBricks = 30;
}

function stopper() {
    
}

function fallOff() {
    player.lives--;
    if(player.lives < 1) {
        endGame();
        player.lives = 0;
    }
    updateScoreAndLives();
    stopper();
}

function moveBall() {
    let ballPos = {
        x: ball.offsetLeft,
        y: ball.offsetTop
    }
    if(ballPos.y > (contDim.height - 20) || ballPos.y < 0) {
        if(ballPos.y > (contDim.height - 20)) {
            fallOff();
        } else {

        }
        player.ballDir[1] *= -1;
    }
    if(ballPos.x > (contDim.width - 20) || ballPos.x < 0) {
        player.ballDir[0] *= -1;
    }
    if (isCollide(paddle, ball)) {
        console.log(((ballPos.x - paddle.offsetLeft) - (paddle.offsetWidth / 2)) / 10);
        player.ballDir[0] = ((ballPos.x - paddle.offsetLeft) - (paddle.offsetWidth/2))/10;
        player.ballDir[1] *= -1;
    }
    let bricks = document.querySelectorAll('.brick');
    for (let brick of bricks) {
        if(isCollide(brick, ball)) {
            player.ballDir[1] *= -1;
            brick.parentNode.removeChild(brick);
            player.score ++;
            updateScoreAndLives();
            totalBricks--;
        }
    }
    ballPos.x += player.ballDir[0];
    ballPos.y += player.ballDir[1];
    ball.style.top = ballPos.y + 'px';
    ball.style.left = ballPos.x + 'px';
}

// var start = null;

// function step(timestamp) {
//     if (!start) start = timestamp;
//     var progress = timestamp - start;
//     container.style.left = Math.min(progress / 10, 200) + "px";
//     if (progress < 3200) {
//         console.log(start);
//         window.requestAnimationFrame(step);
//     }
// }
