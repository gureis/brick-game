const container = document.querySelector('.container');
let contDim = container.getBoundingClientRect();

const gameover = document.createElement('div');
gameover.textContent = "Start Game";
gameover.style.position = "absolute";
gameover.style.color = "white";
gameover.style.lineHeight = "300px";
gameover.style.fontSize = "3rem";
gameover.style.textTransform = "uppercase";
gameover.style.width = "1535px";
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
ball.style.top = "700px";
ball.style.display = "none";
ball.style.left = "49%";

container.appendChild(ball);

const paddle = document.createElement('div');
paddle.style.position = "absolute";
paddle.style.backgroundColor = "white";
paddle.style.width = "120px";
paddle.style.height = "13px";
paddle.style.borderRadius = "25px";
paddle.style.bottom = "235px";
paddle.style.left = "900px";

container.appendChild(paddle);

function startGame() {
    console.log('Tops');
}

let start = null;

function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    container.style.left = Math.min(progress / 10, 200) + "px";
    if (progress < 5000) {
        window.requestAnimationFrame(step);
    }
}

window.requestAnimationFrame(step);