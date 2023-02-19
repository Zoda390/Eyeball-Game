function toNum(b)
{
    return b == true ? 1 : 0;
}


var musicVolumeSlider;
var musicBlendSlider;
var musicPlayer;
var fxSlider;

var player = [];
var enemies = [];
var attacks = [];

function preload() {
    imgPreload();

    musicPlayer = new MusicPlayer('Assets/Sounds/Music/chill.wav', 'Assets/Sounds/Music/full.wav'); //preload

    musicVolumeSlider = createSlider(0.0, 1.0, 0.5, 0.01);
    musicVolumeSlider.input(musicPlayer.updateVolume); //slider change = update volume

    musicBlendSlider = createSlider(0.0, 1.0, 0.5, 0.01);
    musicBlendSlider.input(musicPlayer.updateBlend); //slider change = update blend

    fxSlider = createSlider(0.0, 1.0, 0.5, 0.01);

    SoundFXSetup();
}

function setup() {
    createCanvas(900, 900);
    setupGraphics();
    uim = new UImanager();
    makeMap();
    player.push(new Player(width/2, height/2, "#5DB979"));
}

let debugFlipWait = 100;
let lastDebugFlip = 0;
function draw() {
    //BUG
    if(keyIsDown(66) && keyIsDown(85) && keyIsDown(71) && millis()-lastDebugFlip > debugFlipWait)
    {
        EntityCollider.visualize = !EntityCollider.visualize;
        lastDebugFlip = millis();
    }
    
    rooms[CurrentRoomId].update();
    rooms[CurrentRoomId].render();
    
    layer7Draw();
    
    musicPlayer.play(); //wherever you want to start the music
    ClearFinishedSounds();
}

function keyReleased(){
    if(keyCode == 69){
        uim.showInv = !uim.showInv;
    }
    if(uim.showInv){
        uim.takeInput(keyCode);
    }
}