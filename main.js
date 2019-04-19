const player = {
    gameover: true
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
        player.score = 0;
        player.lives = 3;
        ball.style.display = 'block';
        setupBricks(totalBricks);
        updateScoreAndLives();
        window.requestAnimationFrame(update);
    }
}

function update() {
    let currentPaddlePos = paddle.offsetLeft;
    if(paddle.left) {
        if(currentPaddlePos >= (7))
            currentPaddlePos -= 10;
    }
    if(paddle.right)
        if(currentPaddlePos <= (contDim.width - paddle.offsetWidth - 10))
            currentPaddlePos += 10;
    paddle.style.left = currentPaddlePos + 'px';
    window.requestAnimationFrame(update);
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

function randomColor() {
    return '#' + Math.random().toString(16).substr(-6);
}

function updateScoreAndLives() {
    document.querySelector('.score').textContent = player.score;
    document.querySelector('.lives').textContent = player.lives;
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
