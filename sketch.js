var GameColors = {
    "black": "#000000",
    "white": "#FFFFFF",
    "red": "#FF0000"
};

var player;
var enemies = [];

function setup() {
    createCanvas(window.innerWidth*0.99, window.innerHeight*0.975);
    noStroke();
    player = new Player(width/2, height/2);
    enemies.push(new Monster(100, 100, 100, ["red"], 10, [new Eyeball(0, [], [])]));
    enemies.push(new Monster(100, 100, 100, ["red"], 10, [new Eyeball(0, [], [])]));
    enemies.push(new Monster(100, 100, 100, ["red"], 10, [new Eyeball(0, [], [])]));
}

function draw() {
    background(100);
    for(let i = 0; i<enemies.length; i++){
        enemies[i].render();
    }
    player.render();
}