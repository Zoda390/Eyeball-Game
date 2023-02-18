var entityImgs = [];
var itemImgs = [];

function imgPreload(){
    gamePalette = loadImage("/Assets/Imgs/game_palette.png");

    //Entities
    entityImgs.push(loadImage("Assets/Imgs/Entities/player1.png"));

    //Items
    itemImgs.push(loadImage("/Assets/Imgs/Items/Eyeballs/eye1_palette.png"));
    itemImgs.push(loadImage("/Assets/Imgs/Items/Eyeballs/eye2_palette.png"));
}