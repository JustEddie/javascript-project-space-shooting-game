//canvas setting
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
let canvas;
let ctx;
let isGameOver = false;
let score = 0;
let highScore = score;
let gameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 400; // change later maybe?
    this.canvas.height = 700;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[1]);
    this.interval = setInterval(updateGameArea, 50);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};
gameArea.start();

let dx = 20;
let dy = 20;

//load image ...

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

//use jpeg instead of png..
function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/spaceBackground.jpeg";

  spaceshipImage = new Image();
  spaceshipImage.src = "images/spaceShip.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet3.png";

  enemyImage = new Image();
  enemyImage.src = "images/enemyImage.png";

  gameOverImage = new Image();
  gameOverImage.src = "images/gameOver.jpeg";
}
loadImage();
//rendering image
//spaceship (x,y) starting point : middle down on canvas
let spaceshipX = gameArea.canvas.width / 2 - 32;
let spaceshipY = gameArea.canvas.height - 64;

function render() {
  gameArea.context.drawImage(
    backgroundImage,
    0,
    0,
    gameArea.canvas.width,
    gameArea.canvas.height
  );
  gameArea.context.drawImage(spaceshipImage, spaceshipX, spaceshipY);
  function drawScore() {
    gameArea.context.font = "16px Arial";
    gameArea.context.fillStyle = "#0095DD";
    gameArea.context.fillText(
      `Score: ${score} \n High Score : ${highScore}`,
      8,
      20
    );
  }
  drawScore();
}


//keypress spaceship move.. eventlistner...
function movement() {
  document.addEventListener("keydown", (event) => {
    if ((event.key === "ArrowLeft" || event.key === "a") && spaceshipX > 0) {
      spaceshipX = spaceshipX - dx;
    } else if (
      (event.key === "ArrowRight" || event.key === "d") && spaceshipX < 330) {
      spaceshipX = spaceshipX + dx;
    } else if ((event.key === "ArrowUp" ||event.key === "w") && spaceshipY > 0){
      spaceshipY = spaceshipY - dy;
    } else if ((event.key === "ArrowDown" ||event.key === "s") && spaceshipY < 630) {
      spaceshipY = spaceshipY + dy;
    }
    if (event.code === "Space") {
      startBullet();
    }
  });
}
movement();

//generate enemy...
class generateEnemies {
  constructor() {
    this.enemyX = Math.floor(Math.random() * 330);
    this.enemyY = 0;

    this.update = function () {
      ctx = gameArea.context;
      this.enemyY = this.enemyY + 0.5+0.1*(score);
      ctx.drawImage(enemyImage, 0,0,64,64,this.enemyX, this.enemyY,30,30);
    };
  }
}

let enemies = [];
let enemy;
function startEnemy() {
  enemy = new generateEnemies();
  enemies.push(enemy);
}

//if I want to make harder stages, make stage function, change setInterval number to faster, (can get it as argument)
function keepAddingEnemy() {
  setInterval(startEnemy, 750);
  if (isGameOver) {
    clearInterval(startEnemy);
  }
}
keepAddingEnemy();

function updateGameArea() {
  gameArea.clear();
  render();

  for (let i = 0; i < enemies.length; i++) {
    for (let j = 0; j < bullets.length; j++) {
      let enemy = enemies[i];
      let bullet = bullets[j];
      if (
        bullet.bulletX >= enemy.enemyX - 32 &&
        bullet.bulletX <= enemy.enemyX + 32 &&
        bullet.bulletY >= enemy.enemyY -32&&
        bullet.bulletY <= enemy.enemyY + 32
      ) {
        score = score + 1;
        if (highScore <= score) {
          highScore = score;
        }
        enemies.splice(i, 1);
        bullets.splice(j, 1);
      }
    }
    enemies[i].update();
  }

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update();
  }
  gameIsOver();
  if (isGameOver == true) {
    gameArea.clear();
    render();
    clearInterval(gameArea.interval);
    gameArea.context.drawImage(gameOverImage, 0, 150, 400, 300);
    // clearInterval(gameArea.interval);
    replay();
  }
}

function replay() {
  let result = confirm(`Your high score is : ${highScore} \n Play again?`);
  if (result) {
    score = 0;

    enemies = [];
    bullets = [];
    spaceshipX = gameArea.canvas.width / 2 - 32;
    spaceshipY = gameArea.canvas.height - 64;
    gameArea.start();
    render();

    isGameOver = false;
    updateGameArea(); 
   } else {
    document.write(`Your highest score is ${highScore} \n See you again!`);
    gameArea.context.drawImage(gameOverImage, 0, 150, 400, 300);
  }
}

class shootBullet {
  constructor() {
    this.bulletX = spaceshipX + 15;
    this.bulletY = spaceshipY;

    this.update = function () {
      ctx = gameArea.context;
      this.bulletY = this.bulletY - 25;
      ctx.drawImage(bulletImage,0,0,64,64, this.bulletX, this.bulletY,30,30);
    };
  }
}
let bullets = [];
function startBullet() {
  const bullet = new shootBullet();
  bullets.push(bullet);
}



//game over
function gameIsOver() {
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (enemy.enemyY >= 700) {
      return (isGameOver = true);
    } else if (
      spaceshipX >= enemy.enemyX -20 &&
      spaceshipX <= enemy.enemyX &&
      spaceshipY >= enemy.enemyY -20&&
      spaceshipY <= enemy.enemyY 
          ) {
      return (isGameOver = true);
    }
  }
}


function copyScore() {
  let copyText = document.getElementById("typeName");
  copyText.select();
  navigator.clipboard.writeText(`${copyText.value}'s highest score is ${highScore}`);

  alert(`Copied the text:  ${copyText.value}'s highest score is ${highScore}`);
}