//canvas setting
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
let canvas;
let ctx;

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
//maybe  https://pixelencounter.com/Api/Monsters
// later oop concepts ? object class
let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

//use jpeg instead of png..
function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.jpeg";

  spaceshipImage = new Image();
  spaceshipImage.src = "images/spaceShip.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "images/enemyImage1.png";

  gameOverImage = new Image();
  gameOverImage.src = "images/gameOver.jpeg";
}

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
}

// function main() {
//   //how often? 1 sec?
//   render();
//   requestAnimationFrame(main);
// }

loadImage();
// main();

//set 1 move

//2d array
//keypress spaceship move.. eventlistner...
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && spaceshipX > 0) {
    spaceshipX = spaceshipX - dx;
  } else if (event.key === "ArrowRight" && spaceshipX < 330) {
    spaceshipX = spaceshipX + dx;
  } else if (event.key === "ArrowUp") {
    spaceshipY = spaceshipY - dy;
  } else if (event.key === "ArrowDown" && spaceshipY < 630) {
    spaceshipY = spaceshipY + dy;
  }
  if (event.code === "Space") {
    startBullet();
  }
});

//generate enemy...
class generateEnemies {
  constructor() {
    this.enemyX = Math.floor(Math.random() * 300);
    this.enemyY = 0;

    this.update = function () {
      
      ctx = gameArea.context;
      this.enemyY = this.enemyY + 1;
      ctx.drawImage(enemyImage, this.enemyX, this.enemyY);
    };
  }
}
// let interval = setInterval(generateEnemy, 1500);
let enemy = [];

function startEnemy() {
  const newEnemy = new generateEnemies();
  enemy.push(newEnemy);
}

function keepAddingEnemy() {
  setInterval(startEnemy, 1500);
}
keepAddingEnemy();

function updateGameArea() {
  gameArea.clear();
  render();
  for (let i = 0; i < enemy.length; i++) {
    enemy[i].update();

  }
  for (let i = 0; i < bullet.length; i++) {
    bullet[i].update();
  }

}

class shootBullet {
  constructor() {
    this.bulletX = spaceshipX + 15;
    this.bulletY = spaceshipY;

    this.update = function () {
      ctx = gameArea.context;
      this.bulletY = this.bulletY - 10;
      ctx.drawImage(bulletImage, this.bulletX, this.bulletY);
    };
  }
}
let bullet = [];
function startBullet() {
  const newBullet = new shootBullet();
  bullet.push(newBullet);

}

//bullet shooting : change
// function shootBullet(){
//   let bullet;
//   let bulletX = spaceshipX+15;
//   let bulletY = spaceshipY;
//   gameArea.context.drawImage(bulletImage,bulletX,bulletY);
// }

//game over
// function gameIsOver() {
//   if (enemyY >= 650) {
//     // ctx.drawImage(gameOverImage,0,300);
//     window.confirm("game over! play again?");
//   }
// }
// gameIsOver();
//score board
//high score board .. every enemy dead add score
//how can I store highest score ever with nick name input??

//idea - credit : like : so I can store likes??
