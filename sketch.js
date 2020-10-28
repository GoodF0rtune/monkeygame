var scene;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var inviGround;
var test, testImg;
var foodGroup, foodImg;
var obGroup, obImg;
var score;

function preload() {

  testImg = loadImage("side.jpg");
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  foodImg = loadImage("banana.png");
  obImg = loadImage("obstacle.png");
}



function setup() {
  createCanvas(600, 600);
  scene = "play";
  score = 0;
  test = createSprite(300, 360);
  test.addImage("test", testImg);
  test.scale = 1.5;
  test.velocityX = -0.5;
  monkey = createSprite(200, 100);
  monkey.addAnimation("run", monkey_running);
  monkey.scale = 0.2;
  invisiGround = createSprite(300, 500, 600, 10);
  invisiGround.visible = false;
  foodGroup = createGroup();
  obGroup = createGroup();
}


function draw() {
  background(200, 200, 255);
  drawSprites();
  if (scene === "play") {
    fill(2, 2, 2);
    textSize(30);
    text("Score: " + score, 200, 200);
    monkey.velocityY += 0.3;
    if (test.x < 250) {
      test.x = 300;
    }
    if (monkey.isTouching(invisiGround)) {
      monkey.velocityY = 0;
    }
    if (monkey.isTouching(invisiGround) && keyDown("up")) {
      monkey.velocityY = -12;
    }
    if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();
      score++;
    }
    if (monkey.isTouching(obGroup)) {
      obGroup.destroyEach();
      score--;
    }
    if (score < 0) {
      score = 0;
      scene = "restart";
    }
    if (frameCount % 100 === 0) {
      createFood();
    }
    if (frameCount % 150 === 0) {
      createOb();
    }
  } else {
    foodGroup.destroyEach();
    obGroup.destroyEach();
    fill(0, 0, 0);
    textSize(59);
    text("MONKEY HAS BEEN CAUGHT\npress space to restart", 0, 200);
    test.velocityX = 0;
    if (keyDown("space")) {
      test.velocityX = -1.5;
      score = 0;
      scene = "play";
    }
  }
}

function createFood() {
  var food = createSprite(1000, 300, 10, 10);
  food.velocityX = -4;
  food.addImage("banana", foodImg);
  food.scale = 0.2;
  food.lifeTime = 200;
  foodGroup.add(food);

}

function createOb() {
  var obs = createSprite(1000, 500);
  obs.velocityX = -4;
  obs.addImage("ob", obImg);
  obs.scale = 0.3;
  obs.lifeTime = 200;
  obs.setCollider("circle", 0, 0, 130);
  //obs.debug = true;
  obGroup.add(obs);
}