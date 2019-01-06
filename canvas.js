console.log('connected!');
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const c = canvas.getContext('2d');
// //start drawing line:
// c.beginPath();
// //select starting point(x, y):
// c.moveTo(250, 250);
// //next point in path of line:
// c.lineTo(400, 250);
// c.lineTo(400, 400);
// c.lineTo(250, 400);
// c.lineTo(250, 250);
// c.fillStyle = 'rgba(150, 150, 255, 0.1)';
// c.fillRect(250,250, 150, 150);
//
// c.strokeStyle = 'steelblue';
// c.stroke();
//
// //set fill colour:
// c.fillStyle = 'rgba(255, 0, 255, 1)';
// //draw rectangle: (x, y, width, height):
// c.fillRect(250, 250, 50, 50);
// c.fillStyle = 'rgba(255, 255, 0, 1)';
// c.fillRect(300, 300, 50, 50);
// c.fillStyle = 'rgba(0, 255, 255, 1)';
// c.fillRect(350, 350, 50, 50);
//
//
//
// //draw arc/circle:
// c.beginPath();
// //arc(x(centre), y(centre), radius, starting point(radians), end point(radians), anti-clockwise)
// c.arc(325, 325, 125, 0, Math.PI * 1, false);
// c.stroke();
//
// c.beginPath();
// //for full circle, use Math.PI * 2
// c.arc(325, 325, 125, Math.PI * 1, 0, false);
// c.strokeStyle = 'papayawhip';
// c.stroke();

// for(let i = 0; i < 100; i++){
//   const x = Math.random() * (canvas.width - radius * 2) + radius;
//   const y = Math.random() * (canvas.height - radius * 2) + radius;
//   c.beginPath();
//   c.arc(x, y, radius, 0, Math.PI * 2, false);
//   c.strokeStyle = colours[Math.floor(Math.random() * colours.length)];
//   c.stroke();
// }
// let x = Math.random() * (canvas.width - radius * 2) + radius;
// let y = Math.random() * (canvas.height - radius * 2) + radius;
// let dx = (Math.random() - 0.5) * 30;
// let dy = (Math.random() - 0.5) * 30;
// function animate(){
//   requestAnimationFrame(animate);
//   c.clearRect(0,0, canvas.width, canvas.height);
//   c.beginPath();
//   c.arc(x, y, radius, 0, Math.PI * 2, false);
//   c.strokeStyle = colours[Math.floor(Math.random() * colours.length)];
//   c.stroke();
//   if(x + radius > canvas.width || x - radius < 0){
//     dx = -dx;
//   }
//   if(y + radius > canvas.height || y - radius < 0){
//     dy = -dy;
//   }
//   x += dx;
//   y += dy;
// }
// animate();

// const colours = ['red', 'gold', 'grey', 'blue', 'steelblue', 'rebeccapurple', 'lime', 'hotpink'];

// const colours = ['#29DBE8', '#3AFFD5', '#29E889', '#2DFF5B'];
const colours = ['#F2B134', '#068587', '#4FB99F', '#ED553B'];
let circles = [];
const maxRadius = 10;

const mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener('resize', handleResize);
window.addEventListener('mousemove', handleMouseMove);

function handleResize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
}

function handleMouseMove(event){
  mouse.x = event.x;
  mouse.y = event.y;
}
function init(){
  circles = [];
  for(let i = 0; i < 500; i++){
    const radius = Math.random() * 3 + 2;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 1;
    const dy = (Math.random() - 0.5) * 1;
    // const colour = 'rgba(0,0,0, 0.1)';
    const colour = colours[Math.floor(Math.random() * colours.length)];
    circles.push(new Circle(x, y, dx, dy, radius, colour));
  }
}

function Circle(x, y, dx, dy, radius, colour){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;

  this.colour = colour;
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.colour;
    c.stroke();
    // c.shadowBlur = 40;
    // c.shadowColor = 'white';
    c.fillStyle = this.colour;
    c.fill();
  };

  this.update = function(){
    if(this.x + radius > canvas.width || this.x - radius < 0){
      this.dx = -this.dx;
    }
    if(this.y + this.radius > canvas.height || this.y - this.radius < 0){
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //adding interactivity with mouse:
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 && mouse.y - this.y > -50){

      if(this.radius < maxRadius){
        this.radius += 2;
      }

    } else if(this.radius > this.minRadius){
      this.radius -= 1;
    }
    this.draw();
  };
}



function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0, canvas.width, canvas.height);
  circles.forEach(circle => circle.update());
}
init();
animate();
