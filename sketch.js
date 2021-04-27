var bg;
var brand, brandImg, box1;
var htp, cw, rm, sm, mm, im, set, cwImg;
var g, gImg, player, player_run, back, inv;

var gameState = "BRAND";

let bs;
let bgm;

var score = 0;

function preload(){

  bg = loadImage("bg.jpeg");
  brandImg = loadImage("brand.png");
  cwImg = loadImage("cw.jpeg");
  gImg = loadImage("ground.png");
  player_run = loadAnimation("player00.png", "player01.png", "player02.png", "player03.png", "player04.png", "player05.png", "player06.png", "player07.png", "player08.png", "player09.png", "player10.png", "player11.png", "player12.png", "player13.png", "player14.png");

}

function setup() {
  createCanvas(1930, 1090);

  brand = createSprite(960 , 535, 100, 100);
  brand.addImage("brand", brandImg);
  brand.scale = 3;
  brand.visible = false;

  bs = createAudio('logo.wav');

  box1 = createSprite(960, 540, 400, 400);
  box1.visible = false;
  box1.velocityX = 4;

  cw = createSprite(960 , 535, 100, 100);
  cw.addImage("cw", cwImg);
  cw.scale = 5.5;
  cw.visible = false;

  rm = createButton("Runner Mode");
  rm.position(500, 520);
  rm.size(400,100)
  rm.style("font-size","50px");
  rm.style("background-color","#000000")
  rm.style("color","#ffffff");

  sm = createButton("Survival Mode");
  sm.position(1020, 520);
  sm.size(400,100)
  sm.style("font-size","50px");
  sm.style("background-color","#000000")
  sm.style("color","#ffffff");

  mm = createButton("Mini Mode");
  mm.position(500, 700);
  mm.size(400,100)
  mm.style("font-size","51px");
  mm.style("background-color","#000000")
  mm.style("color","#ffffff");

  im = createButton("Inspect Mode");
  im.position(1020, 700);
  im.size(400,100)
  im.style("font-size","50px");
  im.style("background-color","#000000")
  im.style("color","#ffffff");

  set = createButton("Settings");
  set.position(500, 880);
  set.size(400,100)
  set.style("font-size","50px");
  set.style("background-color","#000000")
  set.style("color","#ffffff");

  htp = createButton("How To Play");
  htp.position(1020, 880);
  htp.size(400,100)
  htp.style("font-size","46px");
  htp.style("background-color","#000000")
  htp.style("color","#ffffff");

  back = createButton("Return");
  back.position(100, 50);
  back.size(400,100);
  back.style("font-size","50px");
  back.style("background-color","#000000")
  back.style("color","#ffffff");

  g = createSprite(960 , 830, 1920, 100);
  g.addImage("g", gImg);
  g.scale = 1;
  g.visible = false;
  g.x = width/2
  g.velocityX = -(6 + 3*score/100);
  
  inv = createSprite(960 , 930, 1920, 100);
  inv.visible = false;

  player = createSprite(120 , 630, 100, 100);
  player.addAnimation("running", player_run);
  player.scale = 1;

  bgm = createAudio('CW_bgm.mp3');

  score = 0;

}

function draw() {
  background(bg);

  if(gameState === "BRAND"){
   
    bs.play();
    
    brand.visible = true;

    box1.visible = false; 
    cw.visible = false;
    g.visible = false;
    player.visible = false;
    inv.visible = false;

    rm.hide();
    sm.hide();
    mm.hide();
    im.hide();
    set.hide();
    htp.hide();
    back.hide();

  }

  if(box1.x > 1920 && gameState === "BRAND"){

     gameState = "HOME";
     homeScreen();

     bgm.play();

  }

   console.log(gameState);
  
   drawSprites();
}

function homeScreen(){

  if(gameState === "HOME"){
    
    cw.visible = true;

    rm.show();
    sm.show();
    mm.show();
    im.show();
    set.show();
    htp.show();

    back.hide();

    
    if (g.x < 0){

      g.x = g.width/2;

    }

    rm.mousePressed(()=>{

      gameState = "RM";
      rmScreen();

      bgm.play();

    });

    box1.velocityX = 0;

    brand.visible = false;
    g.visible = false;
    player.visible = false;
    inv.visible = false;

  }

}

function rmScreen(){

  if(gameState === "RM"){
    
    textSize(20);
    fill("black")
    text("Score: " + score, 1850, 50);
    
    score = score + Math.round(getFrameRate()/60);
    g.velocityX = -(6 + 3*score/100);

    if(touches.length > 0 && player.y  >= height-120) {
     
       player.velocityY = -10;
       touches = [];
    }

    rm.hide();
    sm.hide();
    mm.hide();
    im.hide();
    set.hide();
    htp.hide();

    back.show();

    player.velocityY = player.velocityY + 0.8
    player.collide(inv);

    back.mousePressed(()=>{

      gameState = "HOME";
      homeScreen();

    });

    brand.visible = false;
    box1.visible = false; 
    cw.visible = false;
    inv.visible = false;

    g.visible = true;
    player.visible = true;

    player.velocityX = 3;

  }

}
