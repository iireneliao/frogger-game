// CSSI Day 9: Frogger
// Group members: Irene Liao, Shannon H

/* global createCanvas, colorMode, HSB, random, width, height, background, fill, rect, ellipse, keyCode, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, textSize, text, collideRectCircle, loadImage, loadFont, textFont, createImg, image */

/*
TODO
- game over

BONUS
- timer
- car moves faster after score
- play again button
*/

let backgroundColor, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, fast, speedLim, slow, lineHeight, hit1, restartButton;
let car2X, car2Y;
let car3X, car3Y;
let car4X, car4Y;
let randP1, randP2, randP3;
let backgroundImage;
let myFont, resetButton;
let hit2, hit3, hit4;
let frogger, froggerBg;
let finishLine;
let carOne, carTwo, carThree, carFour;
let powerHit
let powerUp;
let time;

function setup()
{ 
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = random(width);
  frogY = height-60;
  score = 0;
  lives = 3;
  fast = 7.5;
  speedLim = 5;
  slow = 3;
  time = 2500;
  gameIsOver = false;
  backgroundImage = loadImage('https://cdn.glitch.com/d5346da1-9069-4a3d-8361-604b3c6a4591%2Fmaxresdefault.jpeg?v=1626792114927');
  froggerBg = loadImage('https://cdn.glitch.com/d5346da1-9069-4a3d-8361-604b3c6a4591%2Fdownload.png?v=1626794759840');
  myFont = loadFont('https://cdn.glitch.com/d5346da1-9069-4a3d-8361-604b3c6a4591%2FFipps-Regular.otf?v=1626792469701');
  frogger = loadImage('https://cdn.glitch.com/d5346da1-9069-4a3d-8361-604b3c6a4591%2Ficon-frogger-pixel-512x512.png?v=1626794227662');
  finishLine = loadImage('https://cdn.glitch.com/d5346da1-9069-4a3d-8361-604b3c6a4591%2Fcb853ddd62b115f.png?v=1626795128496');
  carOne = loadImage('https://cdn.glitch.com/d5346da1-9069-4a3d-8361-604b3c6a4591%2F5764617432080614920_1.png?v=1626795289589');
  carTwo = loadImage('https://cdn.glitch.com/d5346da1-9069-4a3d-8361-604b3c6a4591%2Fcarro3.png?v=1626795409984');
  carThree = loadImage('https://cdn.glitch.com/d5346da1-9069-4a3d-8361-604b3c6a4591%2F5764617434228097536_1.png?v=1626795410117');
  carFour = loadImage('https://cdn.glitch.com/d5346da1-9069-4a3d-8361-604b3c6a4591%2Funnamed.png?v=1626795410773');
  powerUp = loadImage('https://cdn.glitch.com/d5346da1-9069-4a3d-8361-604b3c6a4591%2F333-3336565_power-up-minecraft-ball-pixel-art-clipart.png?v=1626795535117');
  resetButton = createImg('https://cdn.glitch.com/d5346da1-9069-4a3d-8361-604b3c6a4591%2F8da09e0d-475f-48db-96e3-d46beae018c9_RESET-removebg-preview.png?v=1626793388020');
  resetButton.size(150, 65);
  resetButton.position(200, 425);
  resetButton.mousePressed(refreshGame);
  resetButton.hide();
  
  //triangle points
  randP1 = random(100, height-100);
  randP2 = random(100, height-100);
  randP3 = random(lineHeight, height-100);
  
  //Car 1
  car1X = 0;
  car1Y = 100;
  
  //Car 2
  car2X = 0;
  car2Y = 150;
  
  //Car3
  car3X = 0;
  car3Y = 200;
  
  //Car
  car4X = 0;
  car4Y = 250;
  
  lineHeight = 50;
}

function draw()
{
  background(froggerBg);

  image(finishLine, 0, 0, 500, 60);
  
  // Code to display Frog
  image(frogger, frogX, frogY);
  frogger.resize(50,50);

  if (!gameIsOver)
    {
      moveCars();
      drawCars();
      checkCollisions();
      handleScore();
      checkEndGame();
      powerUps();
      //timer();
    }
  else
    { 
      background(backgroundImage);
      resetButton.show();
      if (score == 3)
        {
          textFont(myFont);
          textSize(25);
          text("Game over!", 160, 100);
          text("YOU WIN", 180, 350);
          textSize(20);
          text(`Score: ${score}`, 200, 400);
        }
      else if (lives == 0)
        {
          textFont(myFont);
          textSize(25);
          text("Game over!", 160, 100);
          fill('red');
          text("YOU LOSE", 180, 350);
          fill('green');
          textSize(20);
          text(`Score: ${score}`, 200, 400);
        }
    }     
}

function keyPressed()
{
  if (keyCode === UP_ARROW)
    {
      frogY -= 20;
    }
  else if (keyCode === DOWN_ARROW)
    {
      frogY += 20;
    }
  else if (keyCode === RIGHT_ARROW)
    {
      frogX += 20;
    }
  else if (keyCode === LEFT_ARROW)
    {
      frogX -= 20;
    }
}

function moveCars()
{
  // Move the car
  car1X += fast;
  car2X += slow;
  car3X += speedLim;
  car4X += fast;

  // Reset if it moves off screen
  if (car1X > width)
    {
      car1X = 0;
      car1Y = random(lineHeight, height-100);
    }
  
  if(car2X > width){
    car2X = 0;
    car2Y = random(lineHeight, height-100);
  }
  
  if(car3X > width){
    car3X = 0;
    car3Y = random(lineHeight, height-100);
  }
  
  if(car4X > width){
    car4X = 0;
    car4Y = random(lineHeight, height-100);
  }
}

function drawCars()
{
  // Code for car 1
  fill(0, 80, 80);
  image(carOne, car1X, car1Y, 40, 30);
  // Code for additional cars
  
  fill(0, 80, 80);
  image(carTwo, car2X, car2Y, 40, 30);
  
  fill(0, 80, 80);
  image(carThree, car3X, car3Y, 40, 30);
  
  fill(0, 80, 80);
  image(carFour, car4X, car4Y, 40, 30);
  
}

function checkCollisions()
{
  // If the frog collides with the car, reset the frog and subtract a life.
  hit1 = collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20);
  hit2 = collideRectCircle(car2X, car2Y, 40, 30, frogX, frogY, 20);
  hit3 = collideRectCircle(car3X, car3Y, 40, 30, frogX, frogY, 20);
  hit4 = collideRectCircle(car4X, car4Y, 40, 30, frogX, frogY, 20);
  
  powerHit = collideCircleCircle(randP1, randP2, 20, frogX, frogY, 20);

  if (hit1 || hit2 || hit3 || hit4 || powerHit)
    {
      lives -= 1;
      frogX = width/2;
      frogY = height-60;
    }
}

function handleScore()
{
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (frogY < lineHeight)
    {
      score += 1;
      frogX = width/2;
      frogY = height-60;
    }
  
  
  // Display info
  textSize(12);
  fill(0);
  // Display Lives
  textFont(myFont);
  fill('white');
  text(`Lives: ${lives}`, 10, 460);
  // Display Score
  text(`Score: ${score}`, 10, 485);
}

function checkEndGame()
{
  // If lives is zero, game is over
  // If score is three, game is over
  if (score == 3 || lives == 0)
    {
      gameIsOver = true;
    }
}

function refreshGame()
{
  gameIsOver = false;
  score = 0;
  lives = 3;
  resetButton.hide();
}

function powerUps() {
  //circle(x, y, d)
  fill(360, 100, 100);
  image(powerUp, randP1, randP2, 20, 20);
}

function timer() {
  //collideCircleCircle(circleX, circleY, circleDiameter, circleX2, circleY2, circleDiameter2)
  if (time <= 0) {
    randP1 = random(100, height-100);
    randP2 = random(100, height-100);
  } else {
    time -= 1;
  }
}
