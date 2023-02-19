var entityImgs = [];
var itemImgs = [];
var bgImgs = [];
var uiImgs = [];
var gamePalette;
var greyGamePalette;

function imgPreload(){
    gamePalette = loadImage("/Assets/Imgs/game_palette.png");
    greyGamePalette = loadImage("/Assets/Imgs/grey_game_palette.png");

    //Entities
    entityImgs.push([loadImage("/Assets/Imgs/Entities/playerwalk_L.gif"), loadImage("/Assets/Imgs/Entities/playerwalk_R.gif")]);
    entityImgs.push([loadImage("/Assets/Imgs/Entities/blue-gremlinBug.png")]);

    //Items
    itemImgs.push([loadImage("/Assets/Imgs/Items/Eyeballs/eye1.png"), loadImage("/Assets/Imgs/Items/Eyeballs/eye1_palette.png")]);
    itemImgs.push([loadImage("/Assets/Imgs/Items/Eyeballs/eye2.png"), loadImage("/Assets/Imgs/Items/Eyeballs/eye2_palette.png")]);

    //Backgrounds
    bgImgs.push(loadImage("/Assets/Imgs/Rooms/0_0.png"));

    //UIs
    uiImgs.push("/Assets/Imgs/Ui/Hp Bar.png");
    uiImgs.push("/Assets/Imgs/Ui/Cooldown Bar.png");
    uiImgs.push("/Assets/Imgs/Ui/BLCornerUI.png");
}