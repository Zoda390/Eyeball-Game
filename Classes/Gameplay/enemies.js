class Entity {
    //public pos: [number, number]
    //public pngNum: number
    //this.fillColor = fillColor; //temporary probably

    constructor(x, y, color)
    {
        this.pos = createVector(x, y);
        this.fillColor = color;
        this.bounds = new EntityCollider(x, y, 50, 50);
        this.despawn = false;
    }

    update(){};

    render(){
        this.bounds.render();
    };

    move(x, y){
        let shift = this.orthograph(x, y);
        this.pos.add(shift);
        this.bounds.shiftPos(shift);
    };

    orthograph(x, y)
    {
        return createVector(x, y/2);
    }
}

class LivingEntity extends Entity {
    constructor(x, y, hp, fillColor) {
        super(x, y, fillColor);
        this.hp = hp;
        this.mhp = hp; //max hp
        this.inv = []; //index 0 is held item
        this.eyes = [];
        this.pngNum; //index of image found in LivingEntityImgs[]
        this.weapon;
        this.facing = 0;
        this.frame = 0;
        this.mframe = 3;
    }

    render() {
        super.render();

        layer2.push();
        layer2.noStroke();
        layer2.imageMode(CENTER);
        layer2.rectMode(CENTER);
        

        if(this.pngNum == 0 || this.pngNum == 1){
            entityImgs[this.pngNum][this.facing].setFrame(floor(this.frame));
            layer2.image(entityImgs[this.pngNum][this.facing], this.pos.x, this.pos.y);
        }
        else{
            layer2.fill(this.fillColor);
            layer2.rect(this.pos.x, this.pos.y, 50, 50);
        }
        
        layer2.pop();
    }

    attack(direction)
    {
        if(direction == 3){
            this.facing = 0;
        }
        if(direction == 4){
            this.facing = 1;
        }
        this.weapon.use(this.bounds.center.x + (this.weapon.origin.x * this.bounds.dimens.x), this.bounds.center.y + (this.weapon.origin.y * this.bounds.dimens.y), direction);
    }

    move(x, y){
        if(x < 0){
            this.facing = 0;
            
        }
        else if(x > 0){
            this.facing = 1;
        }
        if(abs(x) > 0 || abs(y) > 0){
            if(abs(x) == 0){
                this.frame = (this.frame+0.08)%this.mframe;
            }
            else{
                this.frame = (this.frame+0.11)%this.mframe;
            }
        }
        super.move(x, y);
    }
}

class Monster extends LivingEntity {
    constructor(x, y, hp, damage, eyes, color) {
        super(x, y, hp, color);
        this.weapon = new Weapon(this, damage, 0, false);
        this.inv.push();
        this.eyes = eyes;
    }
}

class Corpse extends LivingEntity {
    
}