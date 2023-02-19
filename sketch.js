var player = [];
var enemies = [];
var attacks = [];

var bg;
var fg;

function preload() {
    bg = loadImage("/Assets/Imgs/Rooms/0_0.png");
    fg = loadImage("/Assets/Imgs/Rooms/0_0_fore.png");
    imgPreload();
}

function setup() {
    createCanvas(1500, 1500);
    setupGraphics();
    makeMap();
    player.push(new Player(width/2, height/2, "#5DB979"));
}

function draw() {
    rooms[CurrentRoomId].update();
    rooms[CurrentRoomId].render();

    layer7Draw();
}