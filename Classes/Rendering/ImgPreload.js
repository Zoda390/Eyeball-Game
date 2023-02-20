var entityImgs = [];
var itemImgs = [];
var bgImgs = [];
var uiImgs = [];
var gamePalette;
var greyGamePalette;
var emptyPalette;

function imgPreload(){
    gamePalette = loadImage("Assets/Imgs/game_palette.png");
    greyGamePalette = loadImage("Assets/Imgs/grey_game_palette.png");
    emptyPalette = loadImage("Assets/Imgs/empty_palette.png")

    //Entities
    entityImgs.push([loadImage("Assets/Imgs/Entities/playerwalk_L.gif"), loadImage("Assets/Imgs/Entities/playerwalk_R.gif")]);
    entityImgs.push([loadImage("Assets/Imgs/Entities/guywalk_L.gif"), loadImage("Assets/Imgs/Entities/guywalk_R.gif")]); //gremlinBug
    entityImgs.push([loadImage("Assets/Imgs/Entities/dogwalk_L.gif"), loadImage("Assets/Imgs/Entities/dogwalk_R.gif")]); //eyeWalker
    entityImgs.push([loadImage("Assets/Imgs/Entities/shrimpwalk_L.gif"), loadImage("Assets/Imgs/Entities/shrimpwalk_R.gif")]); //tallBug
    entityImgs.push([loadImage("Assets/Imgs/Entities/stalkfloat_L.gif"), loadImage("Assets/Imgs/Entities/stalkfloat_R.gif")]); //eyeFloater

    //Items
    itemImgs.push([loadImage("Assets/Imgs/Items/Eyeballs/eye1.png"), loadImage("Assets/Imgs/Items/Eyeballs/eye1_palette.png")]);
    itemImgs.push([loadImage("Assets/Imgs/Items/Eyeballs/eye2.png"), loadImage("Assets/Imgs/Items/Eyeballs/eye2_palette.png")]);
    itemImgs.push([loadImage("Assets/Imgs/Items/Eyeballs/eye3.png"), loadImage("Assets/Imgs/Items/Eyeballs/eye3_palette.png")]);
    itemImgs.push([loadImage("Assets/Imgs/Items/Eyeballs/eye4.png"), loadImage("Assets/Imgs/Items/Eyeballs/eye4_palette.png")]);
    itemImgs.push([loadImage("Assets/Imgs/Items/Eyeballs/eye5.png"), loadImage("Assets/Imgs/Items/Eyeballs/eye5_palette.png")]);
    itemImgs.push([loadImage("Assets/Imgs/Items/Eyeballs/eye6.png"), loadImage("Assets/Imgs/Items/Eyeballs/eye6_palette.png")]);
    itemImgs.push([loadImage("Assets/Imgs/Items/Eyeballs/eye7.png"), loadImage("Assets/Imgs/Items/Eyeballs/eye7_palette.png")]);
    itemImgs.push([loadImage("Assets/Imgs/Items/Eyeballs/eye8.png"), loadImage("Assets/Imgs/Items/Eyeballs/eye8_palette.png")]);
    itemImgs.push([loadImage("Assets/Imgs/Items/Eyeballs/eye9.png"), loadImage("Assets/Imgs/Items/Eyeballs/eye9_palette.png")]);
    itemImgs.push([loadImage("Assets/Imgs/Items/Weapons/dagger.png"), loadImage("Assets/Imgs/Items/Weapons/dagger.png")]);
    itemImgs.push([loadImage("Assets/Imgs/Items/Weapons/futurePistal.png"), loadImage("Assets/Imgs/Items/Weapons/mental_damage.png")]);
    itemImgs.push([loadImage("Assets/Imgs/Items/Weapons/futureBow.png"), loadImage("Assets/Imgs/Items/Weapons/futureArrow.png")]);

    //Backgrounds
    bgImgs.push([loadImage("Assets/Imgs/Rooms/1_2.png"), loadImage("Assets/Imgs/Rooms/1_2_fore.png")]);
    bgImgs.push([loadImage("Assets/Imgs/Rooms/1_1.png"), loadImage("Assets/Imgs/Rooms/1_1_fore.png")]);
    bgImgs.push([loadImage("Assets/Imgs/Rooms/1_3.png"), loadImage("Assets/Imgs/Rooms/1_3_fore.png")]);

    //UIs
    uiImgs.push(loadImage("Assets/Imgs/Ui/hp_bar.png"));
    uiImgs.push(loadImage("Assets/Imgs/Ui/cooldown_bar.png"));
    uiImgs.push(loadImage("Assets/Imgs/Ui/tl_corner_ui.png"));
    uiImgs.push(loadImage("Assets/Imgs/Ui/tl_corner_ui_top.png"));
    uiImgs.push(loadImage("Assets/Imgs/Ui/player_inv.png"));
    uiImgs.push(loadImage("Assets/Imgs/Ui/cursor1.png"));
    uiImgs.push(loadImage("Assets/Imgs/Ui/cursor2.png"));
    uiImgs.push(loadImage("Assets/Imgs/Ui/player_inv.png")); //options menu
    uiImgs.push(loadImage("Assets/Imgs/Ui/player_inv.png")); //cursor3
}