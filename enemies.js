class Entity {
    //public pos: [number, number]
    //public hp: number
    //public mhp: number
    //public inv: Item[]
    //public eyes: Eye[]
    //public colors: Color[]
    //public pngNum: number 

    constructor(x, y, hp, colors) {
        this.pos = createVector(x, y);
        this.hp = hp;
        this.mhp = hp; //max hp
        this.inv = []; //index 0 is held item
        this.eyes = [];
        this.colors = colors; //list of colors used in the sprite
        this.pngNum = 0; //index of image found in entityImgs[]
    }

    render() {
        push();
        for(let i = 0; i<this.colors.length; i++){
            if(player.canSee(this.colors[i])){
                rect()
            }
        }
        pop();
    }
}

class Monster extends Entity {
    constructor(x, y, hp, colors, damage, eyes) {
        super(x, y, hp, colors);
        this.inv.push(new Weapon(damage, 0, false));
        this.eyes = eyes;
    }
}

class Corpse extends Entity {
    
}