        var PLAY = 1;
        var END = 0;
        var gameState = PLAY;
        var background,backgroundImg
        var score=0;
        var alex,alexImg,alex2Img,alex3Img
        var dr
        var bodyg,bodyImg;
        var gameOver,gameOverImg,restart,restartImg;
        var soldier1,soldier2,soldier3;
        var soldier1Img,soldier2Img,soldier3Img;
        var ground,groundImg,invisibleGround
        var gameOverImg
        var bulletImg

        function preload(){
        backgroundImg = loadImage("images/bg2.png");
        alexImg = loadImage("images/alex.png");
        alex2Img = loadImage("images/alex 2.png");
        alex3Img = loadImage("images/alex3.png");
        
        soldier1Img = loadImage("images/soldier1.png");
        soldier2Img = loadImage("images/soldier2.png");
        soldier3Img = loadImage("images/soldier3.png");
        groundImg = loadImage("images/ground2.png");
        gameOverImg = loadImage("images/gameOver.png");
        restartImg = loadImage("images/restart.png");

        bulletImg = loadImage("images/bullet.png");
}

        function setup() {
        createCanvas(1500,600);
        background = createSprite(300,200,1000,700);
        background.scale = 5
        background.velocityX = -1
        background.addImage(backgroundImg);

     soldiersGroup = new Group()
     bulletsGroup = new Group()

      alex = createSprite(50,520,50,60)
       alex.addImage("alex1",alexImg);
       alex.addImage("alex2",alex2Img);
       alex.addImage("alex3",alex3Img);
       alex.scale = 0.8
       alex.setCollider("circle",0,0,2)
       alex.debug = true
      
       ground = createSprite(750,520,1500,25);
       ground.addImage(groundImg)
       ground.x = ground.width/2
       ground.velocityX = -(6 + 3*score/100);
  
        invisibleGround = createSprite(750,530,1500,20);
        invisibleGround.visible = false;

        gameOver = createSprite(750,300)
        gameOver.addImage(gameOverImg)
        gameOver.visible = false

        restart = createSprite(750,350)
        restart.addImage(restartImg)
        restart.visible = false
     
   
        }

        function draw() {
         score = score + Math.round(getFrameRate()/60);      
        text("Score: "+ score, 500,50);
        spawnBody()

        if (ground.x < 0){
                ground.x = ground.width/2;
              }
              alex.collide(invisibleGround);

        if (gameState===PLAY){
             
                if(keyDown("UP_ARROW") && alex.y >= 159) {
                        alex.velocityY = -12;
                }
                if(keyDown("SPACE")){
                        alex.changeImage("alex2",alex2Img)
                        spawnBullets()
                }
         alex.velocityY = alex.velocityY + 0.5

         if(soldiersGroup.isTouching(alex)){
                 alex.changeImage("alex3",alex3Img)
                 alex.y = 540
                 alex.x = 75
                gameState = END;
          }

          if(bulletsGroup.isTouching(soldiersGroup)){
                  soldiersGroup[0].destroy()
          }
}
else if (gameState === END) {
        gameOverImg.visible = true;
        restart.visible = true;
        
        //set velcity of each game object to 0
        ground.velocityX = 0;
        alex.velocityY = 0;
        soldiersGroup.setVelocityXEach(0);
        
        //set lifetime of the game objects so that they are never destroyed
        soldiersGroup.setLifetimeEach(-1)
        
        if(mousePressedOver(restart)) {
          reset();
        }
      }
        drawSprites();
        }
        function spawnBody() {
        if(frameCount % 200 === 0) {
        var soldier = createSprite(1499,430,10,40);
        soldier.velocityX = -(6 + 1*score/100);
        soldier.setCollider("circle",0,0,150)
        soldier.debug = true
      
        
        //generate random soldiers
        var rand = Math.round(random(1,3));
        switch(rand) {
        case 1: soldier.addImage(soldier1Img);
                break;
        case 2: soldier.addImage(soldier2Img);
                break;
         case 3: soldier.addImage(soldier3Img);
                break;
      
        default: break;
        }
        
        //assign scale and lifetime to the soldier           
        soldier.scale = 0.7;
        soldier.lifetime = 300;
        //add each soldier to the group
        soldiersGroup.add(soldier);
        }
        }


function spawnBullets() {
        //write code here to spawn the bullets
          var bullet = createSprite(50,350,40,10);
          bullet.addImage(bulletImg);
          bullet.scale = 0.1;
          bullet.velocityX = 3;
          bullet.setCollider("circle",0,0,2)
          bullet.debug = true
      
          
           //assign lifetime to the variable
          bullet.lifetime = 200;
          
          //adjust the depth
          bullet.depth = alex.depth;
          alex.depth = alex.depth + 1;
          
          //add each bullet to the group
          bulletsGroup.add(bullet);
        }
        
      

        function reset(){
                gameState = PLAY;
                gameOver.visible = false;
                restart.visible = false;
                
                obstaclesGroup.destroyEach();
                 score = 0;
                
              }
