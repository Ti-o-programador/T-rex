var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;
var cacto;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  cacto1 = loadImage("obstacle1.png");
  
}

function setup() {

  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //crie sprite ground (solo)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //crie um solo invisível
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //gerar números aleatórios
  var rand =  Math.round(random(1,100))
  console.log(rand)

}

function draw() {
  //definir cor do plano de fundo
  background(180);
  
 
  
  
  
  // pulando o trex ao pressionar a tecla de espaço
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //impedir que o trex caia
  trex.collide(invisibleGround);
  
  //Gerar Nuvens
  spawnClouds()
  createCactos();
  
  drawSprites();
}


function spawnClouds(){
 if(frameCount%60===0){
    var cloud=createSprite(600,100,40,10);
    cloud.velocityX=-3;
    cloud.addImage(cloudImage); 
    cloud.scale=0.6;
    cloud.y=Math.round(random(10,60));
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
  }
  
}

function createCactos()
{
  if(frameCount % 60 === 0){
    var cacto = createSprite(400,165,10,40);
    cacto.velocityX = -3;
    cacto.addImage(cacto1);


  }
}



