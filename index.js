//canvas setting
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
let canvas;
let ctx;

let gameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = 400; // change later maybe?
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 50);
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
}



let dx = 20;
let dy = 20;


//load image ...
//maybe  https://pixelencounter.com/Api/Monsters
// later oop concepts ? object class
let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

//spaceship (x,y) starting point : middle down on canvas
let spaceshipX = gameArea.canvas.width / 2 - 32;
let spaceshipY = gameArea.canvas.height - 64;

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

function render() {
  gameArea.context.drawImage(backgroundImage, 0, 0, gameArea.canvas.width, gameArea.canvas.height);
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
});

//generate enemy...
function generateEnemies() {
  this.enemyX = Math.floor(Math.random() * 300);
  this.enemyY = 0;

  this.update = function(){
    render();
    ctx = gameArea.context;
    this.enemyY = this.enemyY + 1;
    ctx.drawImage(enemyImage,this.enemyX,this.enemyY);
  }
}
// let interval = setInterval(generateEnemy, 1500);
let enemy;
function startEnemy(){
    enemy = new generateEnemies();
    gameArea.start();
}

startEnemy();

function updateGameArea(){
    gameArea.clear();
    enemy.update();
}
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
