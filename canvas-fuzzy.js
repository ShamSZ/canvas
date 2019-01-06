const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const c = canvas.getContext('2d');
const colours = ['#068587', '#4FB99F'];
let circles = [];
const maxRadius = 8;

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
  for(let i = 0; i < 50; i++){
    const radius = Math.random() * 3 + 2;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 0.5;
    const dy = (Math.random() - 0.5) * 0.5;
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
    c.shadowBlur = 10;
    c.shadowColor = 'white';
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
        this.radius += 1;
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
