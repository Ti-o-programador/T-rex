var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;
var cacto, cactoGroup, cloudGroup;
var score = 0;
var jumpsound, checkpoitsound, diesound;
var restart, restartImg, gameOver, gameOverImg;

const PLAY = 1;
const END = 0;
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png");
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");

  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");

  jumpsound = loadSound("jump.mp3");
  checkpoitsound = loadSound("checkpoint.mp3");
  diesound = loadSound("die.mp3");
}

function setup() {
  createCanvas(600, 200);

  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.setCollider("circle", 0, 0, 50);
  trex.scale = 0.5;
  
  //crie sprite ground (solo)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  //crie um solo invisível
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  restart = createSprite(300, 100);
  restart.addImage(restartImg);
  restart.scale = 0.4;
  restart.visible = false;

  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;

  cactoGroup = new Group();
  cloudGroup = new Group();
}

function draw() {
  //definir cor do plano de fundo
  background("black");

  // trex.debug = true;

  text("Score: " + score, 500, 50);
  
  if (gameState === PLAY) {
    ground.velocityX = -(4 + score/100);
    score = score + Math.round(getFrameRate()/60);
    if (score > 0 && score%100 === 0) {
      checkpoitsound.play()
    }
    // pulando o trex ao pressionar a tecla de espaço
    if(keyDown("space") && trex.y >= 100) {
      trex.velocityY = -12;
      jumpsound.play()
    }
    
    //gravidade
    trex.velocityY = trex.velocityY + 0.8;
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //impedir que o trex caia
    trex.collide(invisibleGround);
    
    //Gerar Nuvens
    spawnClouds()
    createCactos();

    if (cactoGroup.isTouching(trex)) {       
      gameState = END;
      diesound.play();
      // trex.velocityY = -12;
      // jumpsound.play()
    }  
  } else if (gameState === END) {
    ground.velocityX = 0;
    trex.velocityY = 0
    trex.changeAnimation("collided");    
    cactoGroup.setLifetimeEach(-1);
    cactoGroup.setVelocityXEach(0)
  } 

  
  
  drawSprites();
}

function reset()
{

}


function spawnClouds(){
 if(frameCount % 60 === 0){
    var cloud=createSprite(600,100,40,10);
    cloud.addImage(cloudImage); 
    cloud.velocityX=-3;
    cloud.scale=0.4;
    cloud.y=Math.round(random(10,60));
    cloud.depth=trex.depth;
    //trex.depth=trex.depth+1;
    cloud.lifetime  = 200
    cloudGroup.add(cloud);
  }
  
}

function createCactos()
{
  if(frameCount % 60 === 0){
    var rand = Math.round(random(1, 6));
    var cacto = createSprite(600,165,10,40);

    switch (rand) {
      case 1:
        cacto.addImage(cacto1);
        break;
      case 2:
        cacto.addImage(cacto2);
        break;
      case 3:
        cacto.addImage(cacto3);
        break;
      case 4:
        cacto.addImage(cacto4);
        break;
      case 5:
        cacto.addImage(cacto5);
        break;
      case 6:
        cacto.addImage(cacto6);
        break;
    }

    cacto.velocityX = -(6 + score/100);
    cacto.scale = 0.5;
    cacto.lifetime = 200;                               
    cactoGroup.add(cacto);
  }
}
