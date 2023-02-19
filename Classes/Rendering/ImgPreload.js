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
    entityImgs.push([loadImage("/Assets/Imgs/Entities/guywalk_L.gif"), loadImage("/Assets/Imgs/Entities/guywalk_R.gif")]);
    entityImgs.push([loadImage("/Assets/Imgs/Entities/dogwalk_L.gif"), loadImage("/Assets/Imgs/Entities/dogwalk_R.gif")]);
    entityImgs.push([loadImage("/Assets/Imgs/Entities/shrimpwalk_L.gif"), loadImage("/Assets/Imgs/Entities/shrimpwalk_R.gif")]);
    entityImgs.push([loadImage("/Assets/Imgs/Entities/StalkFloat_L.gif"), loadImage("/Assets/Imgs/Entities/StalkFloat_R.gif")]);

    //Items
    itemImgs.push([loadImage("/Assets/Imgs/Items/Eyeballs/eye1.png"), loadImage("/Assets/Imgs/Items/Eyeballs/eye1_palette.png")]);
    itemImgs.push([loadImage("/Assets/Imgs/Items/Eyeballs/eye2.png"), loadImage("/Assets/Imgs/Items/Eyeballs/eye2_palette.png")]);

    //Backgrounds
    bgImgs.push([loadImage("/Assets/Imgs/Rooms/0_0.png"), loadImage("/Assets/Imgs/Rooms/0_0_fore.png")]);
    bgImgs.push([loadImage("/Assets/Imgs/Rooms/0_-1.png"), loadImage("/Assets/Imgs/Rooms/0_-1_fore.png")]);

    //UIs
    uiImgs.push(loadImage("/Assets/Imgs/Ui/Hp Bar.png"));
    uiImgs.push(loadImage("/Assets/Imgs/Ui/Cooldown Bar.png"));
    uiImgs.push(loadImage("/Assets/Imgs/Ui/BLCornerUI.png"));
    uiImgs.push(loadImage("/Assets/Imgs/Ui/BLCornerUI_Top.png"));
}