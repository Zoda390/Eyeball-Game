class Entity {
    //public pos: [number, number]
    //public pngNum: number
    //this.fillColor = fillColor; //temporary probably

    constructor(x, y, color)
    {
        this.pos = createVector(x, y);
        this.fillColor = color;
        this.bounds = new EntityCollider(x, y, 50, 50);
    }

    update(){};

    render(){
        if(EntityCollider.visualize == true)
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
    constructor(x, y, hp, colors, fillColor, attackOrigin) {
        super(x, y, fillColor);
        this.hp = hp;
        this.mhp = hp; //max hp
        this.inv = []; //index 0 is held item
        this.eyes = [];
        this.pngNum; //index of image found in LivingEntityImgs[]
        this.weapon;
        this.attackOrigin = attackOrigin;
        this.attackDir = 0; //temporary probably
    }

    render() {
        super.render();

        layer2.push();
        layer2.noStroke();
        layer2.imageMode(CENTER);
        layer2.rectMode(CENTER);
        

        if(this.pngNum == 0){
            layer2.image(entityImgs[this.pngNum], this.pos.x, this.pos.y);
        }
        else{
            layer2.fill(this.fillColor);
            layer2.rect(this.pos.x, this.pos.y, 50, 50);
        }
        
        layer2.pop();
    }

    attack(direction)
    {
        this.attackDir = direction;
        if(this.attackDir != 0)
        {            
            this.weapon.use(this.bounds.center.x + (this.attackOrigin.x * this.bounds.dimens.x), this.bounds.center.y + (this.attackOrigin.y * this.bounds.dimens.y), this.attackDir);
        }
    }
}

class Monster extends LivingEntity {
    constructor(x, y, hp, colors, damage, eyes, color, attackOrigin) {
        super(x, y, hp, colors, color, attackOrigin);
        this.weapon = new Weapon(this, damage, 0, false);
        this.inv.push();
        this.eyes = eyes;
    }
}

class Corpse extends LivingEntity {
    
}