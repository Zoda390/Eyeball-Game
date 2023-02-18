var player;
var enemies = [];
var attacks = [];
var manager = new LifetimeManager(attacks);

var layer0, layer1;
var bg;

function preload() {
    bg = loadImage("room.png");
    gamePalette = loadImage("palette1.png");
    palette2 = loadImage("palette2.png");
}

function setup() {
    createCanvas(window.innerWidth*0.99, window.innerHeight*0.975);
    setupGraphics();
    player = new Player(width/2, height/2, new RangedWeapon(10, 50, 0, false), "#5DB97A");

    enemies.push(new Monster(100, 100, 100, ["red"], 10, [new Eyeball(0, [], [])], "#000000"));
    enemies.push(new Monster(100, 100, 100, ["red"], 10, [new Eyeball(0, [], [])], "#000000"));
    enemies.push(new Monster(100, 100, 100, ["red"], 10, [new Eyeball(0, [], [])], "#000000"));
    enemies.push(new Monster(100, 100, 100, ["red"], 10, [new Eyeball(0, [], [])], "#000000"));
    enemies.push(new Monster(100, 100, 100, ["red"], 10, [new Eyeball(0, [], [])], "#000000"));

}

function draw() {
    background(100);

    //update
    player.takeInput();
    for(let i = 0; i < attacks.length; i++) {
        attacks[i].update();
    }

    manager.cleanse();
    layer0.image(bg, 0, 0);

    //draw
    for(let i = 0; i<enemies.length; i++) {
        //enemies[i].render();
    }

    for(let i = 0; i < attacks.length; i++) {
        attacks[i].render();
    }

    player.render();

    layer7Draw();
}