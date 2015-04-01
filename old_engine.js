// Physics test
// Author: Donald Jones <donald@birminghamdeveloper.com>

var canvas = document.getElementById('gravitydemo');
var ctx = canvas.getContext('2d');
var FPS = 60;
var gravity = 0.3;
var friction = 0.042;
var bounce = true;
var collisions = false;

var actors = [];

var BallObj = function () {
  this.x = 20;
  this.y = canvas.height - 20;
  this.vy = -15;
  this.vx = 4;
  return this;
};

ctx.fillStyle = "red";

var drawBall = function (Ball) {
  // don't let the ball fall through the floor
  if (Ball.y >= canvas.height - 5) {
    if (bounce) {
      Ball.vy = Ball.vy * -1;
    } else {
      Ball.vy = 0;
      Ball.y = canvas.height - 5;
    }
    
    // whatever forward vel left should be consumed.
    if (Math.abs(Ball.vx) < friction){
      Ball.vx = 0;
    }
    
    if (Ball.vx !== 0) {
      // let the friction consume some upward momentum as well.
      Ball.vy += (friction / 2);
      
      // friction should work against whichever direction the ball is bouncing.
      if (Ball.vx < 0) {
        Ball.vx += friction;
      } else {
        Ball.vx -= friction;
      }
    }
  }
  
  // bounce off the left and right walls
  if (Ball.x >= canvas.width) {
    Ball.vx = -1 * Ball.vx;
    Ball.x = canvas.width - 5;
  } else if (Ball.x <= 0) {
    Ball.vx = -1 * Ball.vx;
    Ball.x = 5;
  }
  
  // gravity consumes upward moment
  Ball.vy += gravity;
  
  // ball has forward momentum
  if (Ball.vx !== 0) {
    Ball.x += Ball.vx;
  }
  
  // ball has upward momentum
  if (Ball.vy !== 0) {
    Ball.y += Ball.vy;
  }
  
  // don't let the ball render below the floor
  if (Ball.y > canvas.height - 5){
    Ball.y = canvas.height - 5;
  }
  
  if (collisions) {
    CheckCollisions(Ball);
  }
  
  ctx.beginPath();
  ctx.arc(Ball.x, Ball.y, 5, 0, 2 * Math.PI, false);
  ctx.closePath();
  ctx.fill();
};

function CheckCollisions(subject) {
  actors.forEach(function(actor, index) {
    if (actor.x === subject.x && actor.y === subject.y) {
      actors[index].vx = actor.vx * -1;
      actors[index].vy = actor.vy * -1;
    }
  });
};

function getUpward() {
  return parseInt(document.getElementById('upwardV').value);
}

function getForward() {
  return parseInt(document.getElementById('forwardV').value);
}

function getGravity() {
  return parseFloat(document.getElementById('gravity').value);
}

function getFriction() {
  return parseFloat(document.getElementById('friction').value);
}

function getBounce() {
  return (document.querySelector('#bounce:checked') ? true : false);
}

function getCollisions() {
  return (document.querySelector('#collisions:checked') ? true : false);
}

function AddBall() {
  var Ball = new BallObj();
  Ball.x = 10;
  Ball.y = canvas.height - 40;
  Ball.vx = getForward();
  Ball.vy = getUpward() * -1;
  actors.push(Ball);
  return false;
}

function ChangeEnvironment() {
  gravity = getGravity();
  friction = getFriction();
  bounce = getBounce();
  collisions = getCollisions();
  return false;
}

var mainLoop = setInterval(function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  actors.forEach(function (ball) {
    drawBall(ball);
  });
}, 1000 / FPS);