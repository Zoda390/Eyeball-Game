var entityImgs = [];
var itemImgs = [];
var bgImgs = [];
var gamePalette;
var greyGamePalette;

function imgPreload(){
    gamePalette = loadImage("/Assets/Imgs/game_palette.png");
    greyGamePalette = loadImage("/Assets/Imgs/grey_game_palette.png");

    //Entities
    entityImgs.push(loadImage("Assets/Imgs/Entities/player1.png"));

    //Items
    itemImgs.push(loadImage("/Assets/Imgs/Items/Eyeballs/eye1_palette.png"));
    itemImgs.push(loadImage("/Assets/Imgs/Items/Eyeballs/eye2_palette.png"));

    //Backgrounds
    bgImgs.push(loadImage("/Assets/Imgs/Rooms/0_0.png"));
}