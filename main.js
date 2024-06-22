const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 100;
const paddleHeight = 20;
const paddleY = canvas.height - paddleHeight - 10;
let paddleX = (canvas.width - paddleWidth) / 2;

const objectRadius = 10;
const fallingSpeed = 2;

let rightPressed = false;
let leftPressed = false;

let score = 0;
let objects = [];
let gameOver = false;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawObject(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, objectRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

function movePaddle() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

function generateObject() {
  const x = Math.random() * (canvas.width - objectRadius * 2) + objectRadius;
  objects.push({ x: x, y: objectRadius });
}

function updateObjects() {
  for (let i = 0; i < objects.length; i++) {
    objects[i].y += fallingSpeed;

    if (
      objects[i].y + objectRadius > paddleY &&
      objects[i].x > paddleX &&
      objects[i].x < paddleX + paddleWidth
    ) {
      objects.splice(i, 1);
      score++;
    } else if (objects[i].y + objectRadius > canvas.height) {
      gameOver = true;
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Score: ' + score, 8, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPaddle();
  movePaddle();
  
  if (Math.random() < 0.02) {
    generateObject();
  }
  
  updateObjects();
  
  for (let i = 0; i < objects.length; i++) {
    drawObject(objects[i].x, objects[i].y);
  }
  
  drawScore();

  if (gameOver) {
    ctx.font = '48px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('Game Over', canvas.width / 2 - 120, canvas.height / 2);
    return;
  }

  requestAnimationFrame(draw);
}

draw();
