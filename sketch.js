let wallBox;

var player = [];
var enemies = [];
var attacks = [];

var bg;

function preload() {
    bg = loadImage("/Assets/Imgs/Rooms/0_0.png");
    imgPreload();
}

function setup() {
    createCanvas(window.innerWidth*0.99, window.innerHeight*0.975);
    setupGraphics();
    makeMap();
    player.push(new Player(width/2, height/2, "#5DB979"));
    wallBox = new EntityCollider(width/2 - 200, height/2 + 100, 300, 100);
}

function draw() {
    rooms[CurrentRoomId].update();
    rooms[CurrentRoomId].render();


    layer7Draw();

    rooms[CurrentRoomId].doors[0].render();
    rooms[CurrentRoomId].doors[1].render();
}