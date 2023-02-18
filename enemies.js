class Entity {
    //public pos: [number, number]
    //public pngNum: number
    //this.fillColor = fillColor; //temporary probably

    constructor(x, y, color)
    {
        this.pos = createVector(x, y);
        this.fillColor = color;
    }

    update(){};

    render(){};

    move(x, y){
        this.pos.add(this.orthograph(x, y));
    };

    orthograph(x, y)
    {
        return createVector(x, y/2);
    }
}

class LivingEntity extends Entity {
    constructor(x, y, weapon, hp, colors, fillColor) {
        super(x, y, fillColor);
        this.hp = hp;
        this.mhp = hp; //max hp
        this.inv = []; //index 0 is held item
        this.eyes = [];
        this.pngNum = 0; //index of image found in LivingEntityImgs[]
        this.weapon = weapon;
        this.attackDir = 0; //temporary probably
    }

    render() {
        layer2.push();
        layer2.noStroke();
        layer2.fill(this.fillColor);
        layer2.rect(this.pos.x, this.pos.y, 50, 50);

        let atkX = 0, atkY = 0;
        switch(this.attackDir)
        {
            case 1:
                atkY = -25;
                break;
            case 2:
                atkY = 25;
                break;
            case 3:
                atkX = -25;
                break;
            case 4:
                atkX = 25;
                break;
        }

        if(!(atkX == atkY))
        {
            layer2.push();
            layer2.fill(255, 0, 0);
            layer2.rect(this.pos.x + 12.5 + atkX, this.pos.y + 12.5 + atkY, 25, 25);
            layer2.pop();
        }
        layer2.pop();
    }

    attack(direction)
    {
        this.attackDir = direction;
        if(this.attackDir != 0)
        {
            let atkX = 0, atkY = 0;
            switch(this.attackDir)
            {
                case 1:
                    atkY = -25;
                    break;
                case 2:
                    atkY = 25;
                    break;
                case 3:
                    atkX = -25;
                    break;
                case 4:
                    atkX = 25;
                    break;
            }
            
            this.weapon.use(this.pos.x + 25 + atkX, this.pos.y + 25 + atkY, this.attackDir);
        }
    }
}

class Monster extends LivingEntity {
    constructor(x, y, hp, colors, damage, eyes, color) {
        super(x, y, hp, colors, color);
        this.inv.push(new Weapon(damage, 0, false));
        this.eyes = eyes;
    }
}

class Corpse extends LivingEntity {
    
}