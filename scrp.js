const gameContainer = document.getElementById('game-container');
const basket = document.getElementById('basket');
const fruit = document.getElementById('fruit');
const scoreBoard = document.getElementById('score');
let score = 0;
let basketPosition = gameContainer.offsetWidth / 2 - basket.offsetWidth / 2;
let fruitFallingInterval;
let isGameOver = false;

function startGame() {
    document.addEventListener('mousemove', moveBasket);
    dropFruit();
}

function moveBasket(event) {
    const containerRect = gameContainer.getBoundingClientRect();
    basketPosition = event.clientX - containerRect.left - basket.offsetWidth / 2;

    if (basketPosition < 0) {
        basketPosition = 0;
    } else if (basketPosition + basket.offsetWidth > gameContainer.offsetWidth) {
        basketPosition = gameContainer.offsetWidth - basket.offsetWidth;
    }

    basket.style.left = `${basketPosition}px`;
}

function dropFruit() {
    let fruitPosition = 0;
    const fruitStartX = Math.random() * (gameContainer.offsetWidth - fruit.offsetWidth);
    fruit.style.left = `${fruitStartX}px`;

    fruitFallingInterval = setInterval(() => {
        if (fruitPosition + fruit.offsetHeight >= gameContainer.offsetHeight) {
            if (
                fruitStartX + fruit.offsetWidth >= basketPosition &&
                fruitStartX <= basketPosition + basket.offsetWidth
            ) {
                score++;
                scoreBoard.textContent = score;
            } else {
                gameOver();
            }
            resetFruit();
        } else {
            fruitPosition += 5;
            fruit.style.top = `${fruitPosition}px`;
        }
    }, 20);
}

function resetFruit() {
    clearInterval(fruitFallingInterval);
    fruit.style.top = '0';
    if (!isGameOver) {
        dropFruit();
    }
}

function gameOver() {
    isGameOver = true;
    clearInterval(fruitFallingInterval);
    alert(`Game Over! Your score is ${score}`);
    resetGame();
}

function resetGame() {
    score = 0;
    scoreBoard.textContent = score;
    isGameOver = false;
    startGame();
}

startGame();
