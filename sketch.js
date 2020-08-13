const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];
var particle;
var divisionHeight=300;

var score = 0;
var turns = 0;
var gameState = "play";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //plinkos
  for (var j = 25; j <=width; j=j+50){
    plinkos.push(new Plinko(j,75));
  }
  for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,175));
  }
  for (var j = 25; j <=width; j=j+50){
    plinkos.push(new Plinko(j,275));
  }
  for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,375));
  }
}

function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,20,30);
  text ("500", 20, 600);
  text ("400", 100, 600);
  text ("300", 180, 600);
  text ("200", 260, 600);
  text ("100", 340, 600);
  text ("100", 420, 600);
  text ("200", 500, 600);
  text ("300", 580, 600);
  text ("400", 660, 600);
  text ("500", 740, 600);

  // turns
  text ("Turns Left : "+ turns, 640, 30);

  Engine.update(engine);
 
  for (var i = 0; i < plinkos.length; i++){
    plinkos[i].display();   
  }

  if(particle != null){
    particle.display();
        
    if (particle.body.position.y>760){
      if (particle.body.position.x < 80 || particle.body.position.x > 720){
        score = score + 500;      
        particle = null;
      }
      else if((particle.body.position.x < 160 && particle.body.position.x > 81)||(particle.body.position.x < 719 && particle.body.position.x > 640)){
        score = score + 400;
        particle=null;
      }
      else if ((particle.body.position.x < 240 && particle.body.position.x > 161)||(particle.body.position.x < 639 && particle.body.position.x > 560)){
        score = score + 300;
        particle=null;
      } 
      else if ((particle.body.position.x < 320 && particle.body.position.x > 241)||(particle.body.position.x < 559 && particle.body.position.x > 480)){
        score = score + 200;
        particle=null;
      }
      else if (particle.body.position.x < 480 && particle.body.position.x > 321){
        score = score + 100;
        particle=null;
      } 
    }
  }

  //if(frameCount%60 === 0){
    //particles.push(new Particle(random(10, width-10), 10,10));
    //score++;
  //}

  for (var m = 0; m < particles.length; m++){
    particles[m].display();
  }
  

  for (var k = 0; k < divisions.length; k++) {   
    divisions[k].display();
  }

  finish();
}

function mousePressed(){
  if(turns <= 4 && particle == null){
    particle = new Particle(mouseX, 10, 10); 
    turns = turns + 1;
  }
}

function finish(){
  if(turns == 5){
    textSize(30);
    text ("GAME OVER", width/2 - 100, height/3 - 20);
  }
}