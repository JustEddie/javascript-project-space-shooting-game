
//canvas setting
let canvas;
let ctx;

canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');

canvas.width = 400; // change later maybe?
canvas.height = 700;

document.body.appendChild(canvas);

//load image ...

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src = "images/background.jpeg"

    spaceshipImage = new Image();
    spaceshipImage.src = 'images/spaceShip.png';

    bulletImage = new Image();
    bulletImage.src = 'images/bullet.png'

    enemyImage = new Image();
    enemyImage.src = 'images/enemyImage1.png'

    gameOverImage = new Image();
    gameOverImage.src = 'images/gameOver.png'
}
