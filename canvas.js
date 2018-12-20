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

const colours = ['red', 'gold', 'grey', 'blue', 'steelblue', 'rebeccapurple', 'lime', 'hotpink'];

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

function Circle(x, y, dx, dy, radius, colour){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.colour = colour;
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.colour;
    c.stroke();
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
    this.draw();
  };
}

const circles = [];

for(let i = 0; i < 100; i++){
  const radius = 40;
  const x = Math.random() * (canvas.width - radius * 2) + radius;
  const y = Math.random() * (canvas.height - radius * 2) + radius;
  const dx = (Math.random() - 0.5) * 10;
  const dy = (Math.random() - 0.5) * 10;
  const colour = colours[Math.floor(Math.random() * colours.length)];
  circles.push(new Circle(x, y, dx, dy, radius, colour));
}



function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0, canvas.width, canvas.height);
  circles.forEach(circle => circle.update());
}
animate();
