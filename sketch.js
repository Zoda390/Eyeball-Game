var player = [];
var enemies = [];
var attacks = [];
var lifeManager = new LifetimeManager(attacks), collisions = new CollisionManager(player, enemies, attacks);

var bg;

function preload() {
    bg = loadImage("/Assets/Imgs/Rooms/0_0.png");
    imgPreload();
}

function setup() {
    createCanvas(window.innerWidth*0.99, window.innerHeight*0.975);
    setupGraphics();
    player.push(new Player(width/2, height/2, "#5DB979", createVector(0, -0.3)));

    for(let i = 0; i < 5; i++);
        enemies.push(new Monster(100, 100, 100, ["red"], 10, [new Eyeball(0, [], [])], "#000000", createVector(0.5, 0.5)));
}

function draw() {
    //update
    player[0].takeInput();
    for(let i = 0; i < attacks.length; i++) {
        attacks[i].update();
    }
    lifeManager.cleanse();

    //collision
    collisions.simulate();

    //draw
    layer0.image(bg, 0, 0);
    for(let i = 0; i<enemies.length; i++) {
        enemies[i].render();
    }
    
    player[0].render();

    for(let i = 0; i < attacks.length; i++) {
        attacks[i].render();
    }


    layer7Draw();
}