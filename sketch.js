const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var boy, boyIMG;
var gameState = "onSling";
function preload()
{
	boyIMG = loadImage("boy.png");
}

function setup() {
	createCanvas(1600, 700);

	engine = Engine.create();
	world = engine.world;

	ground = new Ground(width/2, 675, 1600, 50)
	tree = new Tree(1400,350);
	stone = new Stone(200, 350);
	Engine.run(engine);
	slingshot = new Boy(stone.body, {x: 210, y: 500});
	boy = createSprite(375,400,5,5);
	boy.addImage(boyIMG);
	mango1 = new Mango(1250,50);
	mango2 = new Mango(1450,50);
	mango3 = new Mango(1300,50);
}


function draw() {
  rectMode(CENTER);
  background(153,255,255);
  ground.display();
  tree.display();
  stone.display();
  mango1.display();
  mango2.display();
  mango3.display();
  detectollision(stone, mango1);
  detectollision(stone, mango2);
  detectollision(stone, mango3);
  drawSprites();
 
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(stone.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}
function detectollision(stone, mango){
	mangoBodyPosition = mango.body.position;
	stoneBodyPosition = stone.body.position;

	var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y)
	if(distance<=mango.r+stone.r)
	{
		Matter.Body.setStatic(mango.body, false);
	}
}
function keyPressed(){
	if(keyCode === 32){
		Matter.Body.setPosition(stone.body, {x:210, y: 500});
		slingshot.attach(stone.body);
	}
}
