
var trex,trex_running,edges,ground,groundImage1,groundImage2;
var invisibleground,obstacle1,obstacle2,obstacle3,obstacle4;
var obstacle5,obstacle6, score=0,obstacle;
var PLAY=1,END=0;
var gamestate= PLAY;
var obstaclesgroup,cloudsgroup;
var trex_collided;

var gameOverImg,restartImg

var jumpsound,diesound,checkpointsound;

function preload(){
 //trex_running=loadAnimation("stand.png","Walk2.png","Walk8.png");
 trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png");
  
 groundImage1=loadImage("ground1.png");
 groundImage2=loadImage("ground2.png"); 
 cloudImage=loadImage("cloud.png"); 
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  trex_collided=loadAnimation("trex_collided.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpsound=loadSound("jump.mp3");
  diesound=loadSound("die.mp3");
  checkpointsound=loadSound("checkPoint.mp3");
                    
  
}

function setup(){
 
  createCanvas(600,200);
  
  var message="this is message";
  console.log(message);
  
  trex=createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided" ,trex_collided);
  
  edges=createEdgeSprites();
  trex.scale=0.5;
  trex.x=50;
  ground=createSprite(200,180,400,20);
  //for showing green and red ground
  //ground.addImage("ground",groundImage1);
  ground.addImage("ground",groundImage2);
  ground.x=ground.width/2;
  //console.log(ground.width);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleground=createSprite(300,190,600,10);
  invisibleground.visible=false;
  
   obstaclesgroup=new Group();
   cloudsgroup= new Group();
  
 // trex.setCollider("circle",0,0,40);
  trex.debug=true;
  
  trex.setCollider("rectangle",0,0,100,trex.height);
  
  
//  var rand =Math.round(random(1,100));
 // console.log(rand);
  
  //console.log("Hello");
  //console.log("hello "+"world "+5);
}
 
function draw(){
  
 // console.time();
  background("white");
  
 
  
  text("score :"+score,50,50);
  
  console.log("this is gamestate: ",gamestate);
  
  if(gamestate===PLAY){
    
    gameOver.visible = false
    restart.visible = false
    
   //giving backward velocity to the ground
    ground.velocityX=-(4+3*score/100);
    
    //scoring
  //  score=score+Math.round(frameCount/60);
      score=score+Math.round(getFrameRate()/60);
   // console.log(getFrameRate());
    
    
    if(score>0 && score%100===0){
     // checkpointsound.play();
    }
    
    //resetting theground
     if(ground.x<0){
    ground.x=ground.width/2;
     }
    
       //trex jumping
       if(keyDown("space")&& trex.y>100){
        trex.velocityY=-10;
         
         //this is the way to load the sound and play it.
      // jumpsound.play();
         
        }
       
       //assigning velocity
   trex.velocityY=trex.velocityY+0.5;
  
   //spawn clouds    
   spawnclouds();
  
   //spawn obstacles
  spawnobstacles();
       
       if(obstaclesgroup.isTouching(trex)){
        // trex.velocityY=-12;
         jumpsound.play();
         
         gamestate=END;
        //diesound.play();
       }
 
  }   else if(gamestate===END){
    
    gameOver.visible = true;
      restart.visible = true;
    ground.velocityX=0;
    trex.velocityY=0;
    
    //change the trex animation
    trex.changeAnimation("collided", trex_collided);
    
    
      //set lifetime of the game objects so that they are never destroyed
    obstaclesgroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
    
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    
    
  if(mousePressedOver(restart)){
    reset();
  }
  }
  
 // console.info("start of the draw function");
 // console.error("this is how error appears");
 // console.warn("A warning");
  
 /* for(var i=0;i<100;i++){
    console.log("running loop");
  }*/
 
// console.log(trex.y);
  //console.count("draw function is called: ");
 // console.count();

 // console.log(ground.x);
  
   //giving forward velocity to trex
 // trex.velocityX=2;
 // console.log(trex.x);
  
  
  
  //console.log(trex.y);
 
  
  trex.collide(invisibleground);
  
  
  
  //trex.collide(edges[3]);
  
  //trex.collide(ground);
  
  
   drawSprites();
 // console.timeEnd();
}

function reset(){
  gamestate=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstaclesgroup.destroyEach();
  cloudsgroup.destroyEach();
  score=0;
  trex.changeAnimation("running",trex_running);
}

function spawnobstacles(){
  if(frameCount%60===0){
     obstacle=createSprite(600,165,10,40);
      obstacle.velocityX=-(6+ score/100);
    var rand =Math.round(random(1,6));
    switch(rand){
    case 1: obstacle.addImage(obstacle1);
            break;
    case 2: obstacle.addImage(obstacle2);
            break;
    case 3: obstacle.addImage(obstacle3);
            break;
    case 4: obstacle.addImage(obstacle4);
            break;
    case 5: obstacle.addImage(obstacle5);
            break;
    case 6: obstacle.addImage(obstacle6);
            break;  
    default: break; 
    }
    obstacle.scale=0.5;
    obstacle.lifetime=200;
   // obstacle.depth=trex.depth;
    obstaclesgroup.add(obstacle);
  }
}

function spawnclouds(){
  if(frameCount % 60===0){
    
    cloud=createSprite(600,100,40,10);
    cloud.addImage("image",cloudImage);
    cloud.y=Math.round(random(10,60));
  
    cloud.scale=0.4;
    cloud.velocityX=-3;
    
    cloud.depth=trex.depth;
    trex.depth=cloud.depth+1;
     

    //cloud.lifetime=60;
   // cloud.lifetime=180;
    cloud.lifetime=200;
    
    cloudsgroup.add(cloud);
    
   // console.log(trex.depth);
   // console.log(cloud.depth);
  }
}