// examples of data types
// string 
var string = "This is a string";
console.log (string);

// number
var number = 100;
console.log (number);

// boolean
var bool = true;
console.log (bool);

// undefined 
var object ;
console.log (object);

object=null;
console.log(object);

// ARRAY
var arr1 = [1,2,3,4,5] ;
console.log (arr1);

var arr2 = [1, "string", true];
console.log (arr2);

var arr3 = [[1,2], [2,3], [3,4]];
console.log (arr3[0][1]);


arr3.push ("my name");
console.log (arr3);

arr3.pop();
console.log(arr3);

arr3.pop();
console.log(arr3);

//create constant engine world and bodies
const Engine = Matter.Engine ;
const World = Matter.World; 
const Bodies = Matter.Bodies; 
const Constraint = Matter.Constraint; 
const Render = Matter.Render;

//create my engine and my world
var myEngine, myWorld ; 



//variables
var ground ; 
var box1, box2, box3, box4, box5;
var pig1, pig2;
var log1, log2, log3, log4;
var bird;
var backgroundImg;
var slingshot;
var platform;
var gameState="onSling";
var score=0 ;

function preload(){

  //call get background function
  getBackground();

}

function setup() {
  createCanvas(1200,400);

  //this line of code will be constant and it is used to make the engine and world
  myEngine = Engine.create ();
  myWorld = myEngine.world;

  //create ground body and add options
  ground = new Ground (600,height,1200,20);

  //create 1st layer boxes
  box1 = new Box (700,320,70,70);
  box2=new Box (920,320,70,70);
  //create 1st layer pig using pig class
  pig1 = new Pig (810,350);
  //create 1st layer log
  log1= new Log (810,260,300,PI/2);
  

  //create 2nd layer boxes
  box3= new Box(700,240,70,70);
  box4= new Box(920,240,70,70);
  //2nd layer pig
  pig2 = new Pig (810,220);
  //2nd layer log
  log2=new Log(810,180,300,PI/2);

  //create 3rd layer box
  box5 = new Box(810,160,70,70);
  //create 3rd layer logs
  log3= new Log(760,120,150,PI/7);
  log4=new Log (870,120,150,-PI/7);

  //create platform
  platform=new Ground(180,305,300,170);

  //create bird
  bird = new Bird (200,50);

  //create slingshot
  slingshot=new Slingshot(bird.body, {x: 200, y:50});

  
}

function draw() {

  if (backgroundImg){
    background(backgroundImg); 
  }

  //display text for score
  textSize(35);
  fill ("white");
  text ("Score  : " + score, width-300, 50);
  
  //keep engine updated to make code work; this is also a constant line of code that you will repeat everytime 
  Engine.update (myEngine);

  //display ground
  ground.display();

  //display 1st layer box
  box1.display();
  box2.display();
  //display 1st layer pigs
  pig1.display();
  //scoring
  pig1.score();
  //display 1st layer log
  log1.display();

  //display 2nd layer box
  box3.display();
  box4.display();
  //display 2nd layer pigs
  pig2.display();
  //scoring
  pig2.score();
  //display 2nd layer log
  log2.display();

  //display 3rd layer box
  box5.display();
  //display 3rd layer logs
  log3.display();
  log4.display();

  //display platform
  platform.display();

  //display bird
  bird.display();

  //display rope
  slingshot.display();

}


//mouse dragged function
function mouseDragged(){

  if (gameState=="onSling"){
    //let mouse drag bird
    Matter.Body.setPosition(bird.body,{x : mouseX, y: mouseY});
  }

}

//mouse released function
function mouseReleased(){

  //let bird fly
  slingshot.fly();

  //change gameState
  gameState="launched";

}



function keyPressed (){

  console.log(bird.body.speed);

  //when space key is pressed 
  if (keyCode === 32 ){

    //if bird is not moving or if it is out of the canvas,
    if (bird.body.speed<1 || (bird.body.position.x>width || bird.body.position.y>height)){
      //reset position of bird to slingshot 
      Matter.Body.setPosition(bird.body,{x : 200, y: 50});
      //attach bird to sligshot rope to shoot again
      slingshot.attach(bird.body);

      //empty bird's trajectory to erase previous path
      bird.trajectory = [];

      //reset gameState so you can shoot again
      gameState="onSling";

    }

  }

}


async function getBackground() {

  var response = await fetch ("http://worldtimeapi.org/api/timezone/America/Chicago");
  console.log (response);
  var responseJSON  = await response.json();
  console.log (responseJSON.datetime);
  var hour = responseJSON.datetime.slice(11,13);
  console.log(hour);

  var bg;
  //from 6am to 6pm,
  if (hour>6 && hour<18){  
    //give morning background
    bg="sprites/bg.png";
  }
  //from 7pm to 5am
  else {
    //give night background
    bg="sprites/bg2.jpeg";
  }

  //load background images
  backgroundImg=loadImage(bg);

}