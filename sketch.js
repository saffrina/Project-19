var bananaImage,bananaGroup;
var obstacleImage;
var obstacleGroup;
var backImage,backgr;
var score;
var player_running,player;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var invisibleGround;

function preload(){
  backImage = loadImage("jungle.png");
   player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
   
   bananaImage = loadImage("banana.png");
   obstacleImage = loadImage("stone.png")
}

function setup() {
  createCanvas(800, 400);
 // back_ground = 0;
 // back_ground.velocityX = 3;
 // back_ground = loadImage("jungle.png");
  
    
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=3;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  invisibleGround = createSprite(400, 350, 800, 10);
  invisibleGround.velocityX = -4;
  invisibleGround.x=invisibleGround.width/2;
  invisibleGround.visible = false;
  
  score = 0;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(220);
  
if(invisibleGround.x<0){
    invisibleGround.x=invisibleGround.width/2;
  }
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  if(bananaGroup.collide(player)){
    bananaGroup.destroyEach();
    score = score+2;
  }
  switch(score){
    case 10: player.scale=0.12;
        break;
    case 20: player.scale=0.14;
        break;
    case 30: player.scale=0.16;
        break;
    case 40: player.scale=0.18;
        break;
    default: break;    
  }

  if (keyDown("space")) {
    player.velocityY = -12 ;
  }
  
  player.velocityY = player.velocityY + 0.8;
  player.collide(invisibleGround);
  banana();
  obstacle();
  
  if(obstacleGroup.isTouching(player)){
    player.scale = 0.2;
  }
  
  
  
  score = score + Math.round(getFrameRate()/60);
  

  
  

  
  
    
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500, 50);
}

function banana() {
  if (frameCount % 80 === 0) {
    var bananas = createSprite(600,250,40,10);
    bananas.y = Math.round(random(120, 200));
    bananas.addImage(bananaImage);
    bananas.scale = 0.05;
    bananas.velocityX = -3;
    bananas.lifetime = 200;
    player.depth = banana.depth+1
    
    bananaGroup.add(bananas);
 }
}

function obstacle() {
  if (frameCount % 300 === 0) {
    var obstacles = createSprite(800,350,10,40);
    obstacles.addImage(obstacleImage);
    obstacles.scale = 0.3;
    obstacles.velocityX = -6;
    obstacles.lifetime = 300;
    
    obstacleGroup.add(obstacles);
  }
}