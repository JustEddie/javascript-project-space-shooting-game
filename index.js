
//canvas setting
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
let canvas;
let ctx;

canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');

canvas.width = 400; // change later maybe?
canvas.height = 700;

document.body.appendChild(canvas);

//load image ...

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

//spaceship (x,y) starting point : middle down on canvas
let spaceshipX = canvas.width/2-32;
let spaceshipY = canvas.height - 64;


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
    gameOverImage.src = 'images/gameOver.jpeg'
}

//rendering image

function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY)
}

function main(){
    render()
    requestAnimationFrame(main);
}

loadImage();
main();


//keypress spaceship move.. eventlistner...

//more enemy...


//score board
//high score board .. every enemy dead add score
//how can I store highest score ever with nick name input??


//idea - credit : like : so I can store likes??
