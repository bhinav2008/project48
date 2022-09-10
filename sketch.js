var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg
var zgroup 
var bullet,bulletImg
var bgrp 
var score = 0
var life = 3
function preload(){
  
  shooterImg = loadImage("assets/ar1.png")
  shooter_shooting = loadImage("assets/ar2.png")
zombieImg = loadImage("assets/zombie img.png")
  bgImg = loadImage("assets/bg.jpeg")
  bulletImg = loadImage("assets/fb.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.6
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

zgroup = new Group()
bgrp = new Group()
}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet = createSprite(displayWidth-1150,player.y-70,20,20)
 bullet.velocityX = 20
 bullet.addImage(bulletImg)
 bullet.scale = 0.05
 bgrp.add(bullet)
  player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if (zgroup.isTouching(player)){
  for (var i = 0 ;i<zgroup.length ; i++){
    if (zgroup[i].isTouching(player)){
      zgroup[i].destroy()
      life = life -1
      
    }
  }
}
if (zgroup.isTouching(bgrp)){
  for (var i = 0 ;i<zgroup.length ; i++){
    if (zgroup[i].isTouching(bgrp)){
      zgroup[i].destroy()
      bgrp.destroyEach()
      score = score +2
    }
  }
}
enemy()
drawSprites();
textSize(20)
fill("white")
text("score ="+score,displayWidth-200,displayHeight/2-340)
text("life ="+life,displayWidth-200,displayHeight/2-300)
}

function enemy(){
  if (frameCount%50===0){
    zombie = createSprite(random(800,1700),random(300,600),40,40)
    zombie.addImage(zombieImg)
     zombie.scale = 0.11
     zombie.velocityX = -3
     zgroup.add(zombie)
  }
}
