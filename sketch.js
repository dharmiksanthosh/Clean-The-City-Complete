var bg,bgimg,cleaner,boyimg,ob1,ob2,ob3,ob4,ob5,ob6,ob7,ob8,ob9,score,hdustbin,wdustbin,rdustbin;
var wgroup,hgroup,gamestate,state2,form,check,pb,pbimg,ibimg,ib,clb,col,count,ctxt,orent,ort,dev;
var mcount,clok,state3,sth4,stw4,str4,lb,rb,lbp = false,rbp = false,re,reimg,touches = [],bs;

function preload(){

  bgs = loadImage("images/bg/bgs.png");
  bgp = loadImage("images/bg/bgp.png");
  bgeg = loadImage("images/bg/bgeg.png");
  bgeb = loadImage("images/bg/bgeb.png");

  ints = loadImage("images/forms/ints.png");

  boyimg = loadAnimation("images/player/1.png","images/player/2.png","images/player/3.png","images/player/4.png");
  boystopimg = loadImage("images/player/1.png");

  ob1 = loadImage("images/obs/obh1.png");
  ob2 = loadImage("images/obs/obh2.png");
  ob3 = loadImage("images/obs/obh3.png");
  ob4 = loadImage("images/obs/obr1.png");
  ob5 = loadImage("images/obs/obr2.png");
  ob6 = loadImage("images/obs/obr3.png");
  ob7 = loadImage("images/obs/obw1.png");
  ob8 = loadImage("images/obs/obw2.png");
  ob9 = loadImage("images/obs/obw3.png");

  clokimg = loadImage("images/obs/timer.png");

  hdust = loadImage("images/bins/hazard.png");
  wdust = loadImage("images/bins/wet.png");
  rdust = loadImage("images/bins/recyle.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  background(bgs);

  state2 = 0;
  gamestate = 'form';

  pbimg = createImg("images/buttons/play.png");
  pbimg.position(width/2-25,height/2);

  ibimg = createImg("images/buttons/int.png");
  ibimg.position(0,0);

  col = color(0, 0, 0, 0);
  pb = createButton('');
  pb.style('background-color', col);
  pb.position(width/2-25,height/2);
  pb.size(75,75);
  pb.id('rbutton');

  ib = createButton('');
  ib.style('background-color', col);
  ib.position(width/0,0);
  ib.size(64,62);
  ib.id('ibutton');

  clb = createButton('');
  clb.style('background-color', col);
  clb.position(width-80,10);
  clb.size(70,70);
  clb.id('rbutton');
  clb.hide();

  state3 = 1;

  if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    
    dev = 'mobile';
  }else{

    dev = 'pc';
  }
}

function draw() {

  ib.mousePressed(info);
  Touching(ib,info);

  clb.mousePressed(close);
  Touching(clb,close);

  pb.mousePressed(start);
  Touching(pb,start);

  if (windowWidth < windowHeight) {
    
    orent = 'portrait';
  }
  if (windowWidth > windowHeight) {
    
    orent = 'landscape';
  }

  if (orent == 'portrait' && state2 == 0 && dev == 'mobile') {
    
    ort = createImg("images/forms/unlock.png");
    ort.position(0,0);
    ort.size(width,height);
  }

  if (state2 === 1) {

    pb.hide();
    pbimg.hide();
    ib.hide();
    ibimg.hide();

    bg = createSprite(width/2,-50,width,height);
    bg.addImage(bgp);

    bs = 1.29
    bg.scale = bs;

    cleaner = createSprite(width*0.6,height/3*2);
    cleaner.addAnimation("boyim",boyimg);
    cleaner.addImage("stop",boystopimg);
    cleaner.scale = 0.5;
    cleaner.frameDelay = 7;

    clok = createSprite(width-50,75,100,125);
    clok.addImage(clokimg);

    score = 0;

    mcount = 120;

    hdustbin = createSprite(width-400,75);
    hdustbin.addImage(hdust);
    hdustbin.scale = 0.6;

    wdustbin = createSprite(width-300,75);
    wdustbin.addImage(wdust);
    wdustbin.scale = 0.6;

    rdustbin = createSprite(width-200,75);
    rdustbin.addImage(rdust);
    rdustbin.scale = 0.6;

    rgroup = new Group();
    wgroup = new Group();
    hgroup = new Group();
    
    gamestate = "play";
    form = new Form();

    rb = createButton('');
    rb.position(width-100,height/3);
    rb.style('background-color', col);
    rb.size(72,height/3-8);
    rb.id('rb');

    lb = createButton('');
    lb.position(0,height/3);
    lb.style('background-color', col);
    lb.size(72,height/3-8);
    lb.id('lb');

    reimg = createImg('images/buttons/restart.png');
    reimg.position(0,100);

    re = createButton(' ');
    re.position(0,100)
    re.size(74,74)
    re.style('background-color',col);
    re.id('rbutton')

    re.hide()
    reimg.hide();

    state2 = 2;
  }

  if (gamestate==="play") {
   
    form.hide();
    cleaner.changeAnimation("boyim",boyimg);

    if (sth4 == 1) {
      
      hdustbin.scale -= 0.2;
      sth4 = 0;
    }


    if (str4 == 1) {
      
      rdustbin.scale -= 0.2;
      str4 = 0;
    }

    if (stw4 == 1) {
      
      wdustbin.scale -= 0.2;
      stw4 = 0;
    } 

    //Getting the infinite Road
    bg.velocityY = 4;
    if (bg.y>900) {

      bg.y = -50;
    }
    if (frameCount % round(frameRate()) === 0 && mcount > -1) {
    
      mcount --;
    }

    rb.show();
    lb.show();

    //Moving the Cleaner-Player(PC)

    rb.mousePressed(()=>{

      rbp = true;
    })
    lb.mousePressed(()=>{

      lbp = true;
    })

    rb.mouseReleased(()=>{

      rbp = false;
    })
    lb.mouseReleased(()=>{

      lbp = false;
    })

    if ((keyDown("right")||keyDown("d")||rbp == true)&&cleaner.x<1220) {
    
      mover();
    }
    if ((keyDown("left")||keyDown("a")||lbp == true)&&cleaner.x>350) {
    
      movel();
    }

    if (rgroup.isTouching(cleaner)) {
      
      gamestate = "pause";

      check = "r";

        rbp = false;
        lbp = false;
      }
    if (wgroup.isTouching(cleaner)) {
      
      gamestate = "pause";

      check = "w";

      rbp = false;
      lbp = false;
    }
    if (hgroup.isTouching(cleaner)) {
      
      gamestate = "pause";

      check = "h";

      rbp = false;
      lbp = false;
    }

    spawngarbage();
  }
  if (gamestate==="pause") {
    
    ask();
  }

  drawSprites();
  if (score == 75) {
      
    gend();
  }
  if (score < 75 && mcount < 0) {
    
    bend();
  }
  fill(0);  

  if (state2 === 2){

    textSize(30);
    text("Score: "+score,width-300,160);
    textAlign(CENTER);
    text(mcount,width-50,100);
  }
  if (re!=undefined) {
    
   re.mousePressed(reset);
   Touching(re,reset);
  }
}

//Spawining Garbage in the game
function spawngarbageR(){

     var obstacleR = createSprite(Math.round(random(350,1150)), 0);
     obstacleR.velocityY = 4;

     var rand = Math.round(random(1,3));
     switch (rand){

      case 1:
          obstacleR.addImage(ob4);
          obstacleR.scale = 0.3;
      break;

      case 2:
          obstacleR.addImage(ob5);
          obstacleR.scale = 0.2;
      break;

      case 3:
          obstacleR.addImage(ob6);
          obstacleR.scale = 0.1;
      break;

      default:
        break;
     }
     rgroup.add(obstacleR);
     obstacleR.lifetime = height;
}
function spawngarbageW(){

 
    var obstacleW = createSprite(Math.round(random(350,1150)), 0);
    obstacleW.velocityY = 4;

    var rand = Math.round(random(1,3));
    switch (rand){

     case 1:
         obstacleW.addImage(ob7);
         obstacleW.scale = 0.01;
     break;

     case 2:
         obstacleW.addImage(ob8);
         obstacleW.scale = 0.2;
     break;

     case 3:
         obstacleW.addImage(ob9);
         obstacleW.scale = 0.2;
     break;

      default:
       break;
    }
    wgroup.add(obstacleW);
    obstacleW.lifetime = height;
}
function spawngarbageH(){


    var obstacleH = createSprite(Math.round(random(350,1150)), 0);
    obstacleH.velocityY = 4;

    var rand = Math.round(random(1,3));
    switch (rand){

     case 1:
         obstacleH.addImage(ob1);
         obstacleH.scale = 0.03;
     break;

     case 2:
         obstacleH.addImage(ob2);
         obstacleH.scale = 0.5;
         obstacleH.setCollider("rectangle",0,0,200,200);
     break;

     case 3:
         obstacleH.addImage(ob3);
         obstacleH.scale = 0.5;
         obstacleH.setCollider("rectangle",0,0,200,200);
     break;

     
     default:
       break;
    }
    hgroup.add(obstacleH);
    obstacleH.lifetime = height;
}
function spawngarbage(){
  if(frameCount % 180 ===0 ){
    var r = Math.round(random(1,3));
    if(r === 1){
      spawngarbageR();
    }else if(r === 2){
      spawngarbageH();
    }else
    {spawngarbageW();
    }
  }

}
function ask(){

  form.show();
  form.display();

    rb.hide();
    lb.hide();

  if (check === "h") {
   
    hgroup.lifetime = -1;
  }
  if (check === "w") {
   
    wgroup.lifetime = -1;
  }
  if (check === "r") {
   
    rgroup.lifetime = -1;
  }

  form.buttonh.mousePressed(()=>{

    if (check==="h"&&check!==undefined) {

        score += 5;
        form.hide();
        gamestate = 'play';
        hgroup.destroyEach();
        hdustbin.scale += 0.2;
        sth4 = 1;
    }
    else if(check==="w"||check==="r"){

      if(score>0){score -= 5;}

      alert("Wrong dustbin");
      form.hide();
      gamestate = 'play';
      wgroup.destroyEach();
      rgroup.destroyEach();
    }
  })
  form.buttonr.mousePressed(()=>{

    if (check==="r"&&check!==undefined) {

        score += 5;
        form.hide();
        gamestate = 'play';
        rgroup.destroyEach();
        rdustbin.scale += 0.2;
        str4 = 1;
    }
    else if(check==="w"||check==="h"){

      if(score>0){score -= 5;}
        alert("Wrong dustbin");
        form.hide();
        gamestate = 'play';
        wgroup.destroyEach();
        hgroup.destroyEach();
    }
  })
  form.buttonw.mousePressed(()=>{

    if (check==="w"&&check!==undefined) {

        score += 5;
        form.hide();
        gamestate = 'play';
        wgroup.destroyEach();
        wdustbin.scale += 0.2;
        stw4 = 1;
    }
    else if(check==="h"||check==="r"){

        if(score>0){score -= 5;}
        
        alert("Wrong dustbin");
        form.hide();
        gamestate = 'play';
        hgroup.destroyEach();
        rgroup.destroyEach();
    }
  })

  if(count < 0){

    if(score>0){score -= 5;}

    alert("Time Up, Be Fast Next Time");
    form.hide();
    hgroup.destroyEach();
    wgroup.destroyEach();
    rgroup.destroyEach();
    gamestate = 'play';
  }

  bg.velocityY = 0;
  rgroup.setVelocityEach(0,0);
  hgroup.setVelocityEach(0,0);
  wgroup.setVelocityEach(0,0);
  cleaner.changeAnimation("stop",boystopimg);
}
function gend(){

  gamestate = 'gend';
  state2 = 3;
  bg.velocityY = 0;
  cleaner.changeAnimation('stop');
  background(bgeg)
  re.show();
  reimg.show();

    rb.hide();
    lb.hide();
}
function bend(){

  gamestate = 'bend';
  state2 = 3;
  bg.velocityY = 0;
  cleaner.changeAnimation('stop');
  bg.destroy();
  cleaner.destroy();
  background(bgeb);
  re.show();
  reimg.show();


    rb.hide();
    lb.hide();
}
function mover() {
  
  cleaner.x += 10;
}
function movel() {
  
  cleaner.x -= 10;
}
function reset() {
  
  window.location.reload();
}
function start(){
  
  state2 = 1;
}
function info(){

  background(ints);

  pb.hide();
  pbimg.hide();
  ib.hide();
  ibimg.hide();

  clb.show();
  ibimg.show();
}
function close(){
  
  background(bgs);

  pb.show();
  pbimg.show();
  ib.show();
  ibimg.show();

  clb.hide();
}
function Touching(b,fun){

  if (touches == [0]) {

    if (touches[0].x < b.position().x + (b.position().width/2) && touches[0].x > b.position().x - (b.position().width/2) && (touches[0].y < b.position().y + (b.position().height/2) && touches[0].y > b.position().y - (b.position().height/2))){

      touches = []
      fun();
    }
    touches = []
  }
}