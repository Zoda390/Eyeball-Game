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

    set(x, y){
        let newPos = createVector(x, y);
        this.pos = newPos;
        this.bounds.setPos(newPos);
    }

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
    constructor(x, y, hp, fillColor, pngNum) {
        super(x, y, fillColor);
        this.hp = hp;
        this.mhp = hp; //max hp
        this.inv = []; //index 0 is held item
        this.eyes = [];
        this.pngNum = pngNum; //index of image found in LivingEntityImgs[]
        this.weapon;
        this.facing = 0;
        this.frame = 0;
        this.mframe = 3;

        this.bounds.dimens = createVector(entityImgs[this.pngNum][0].width, entityImgs[this.pngNum][0].height);
        let corners = this.bounds.bottomCorners();
        this.bounds.points.push(createVector(corners.x - this.bounds.center.x, corners.y - this.bounds.center.y));
        this.bounds.points.push(createVector(corners.z - this.bounds.center.x, corners.y - this.bounds.center.y));
    }

    takeInput()
    {

    }

    render() {
        super.render();

        layer2.push();
        layer2.noStroke();
        layer2.imageMode(CENTER);
        layer2.rectMode(CENTER);
        

        if(this.pngNum != undefined){
            entityImgs[this.pngNum][this.facing].setFrame(floor(this.frame));
            layer2.image(entityImgs[this.pngNum][this.facing], floor(this.pos.x), floor(this.pos.y));
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
        this.weapon.use(direction);
    }

    move(x, y){
        if(x < 0){
            this.facing = 0;
        }
        else if(x > 0){
            this.facing = 1;
        }
        if(abs(x) > 0 || abs(y) > 0){
            let frameMove = (0.05*((abs(x)+abs(y))/2));
            this.frame = (this.frame+frameMove)%this.mframe;
        }
        else{
            this.frame = this.frame%1;
        }
        super.move(x, y);
    }
}

class Player extends LivingEntity {
    constructor(x, y, color) {
        super(x, y, 100, color, 0);
        this.eyes.push(new Eyeball(0));
        this.eyes.push(new Eyeball(1));

        let swg = new Weapon(this, 0, 0, 25, 70, 250, 1000, 9, false, "Swing", 60, 100, 250);
        let ment = new Weapon(this, 0, -0.3, 0.3, 100, 4000, 5000, 10, false, "Mental", 300, 100, 250);
        let prj = new Weapon(this, 0, -0.3, 10, 20, 10000, 400, 11, false, "Projectile", 60, 100, 250);

        this.weapon = ment;
        this.inv = [this.weapon, swg, prj, new Eyeball(2), new Eyeball(3), new Eyeball(4), new Eyeball(5), new Eyeball(6), new Eyeball(7), new Eyeball(8), 0, 0];
    }

    takeInput()
    {
        let posX, posY;
        posX = -1 * toNum(keyIsDown(65)) + toNum(keyIsDown(68));
        posY = -1 * toNum(keyIsDown(87)) + toNum(keyIsDown(83));

        posX *= 5;
        posY *= 5;

        let direction;
        if(keyIsDown(UP_ARROW))
            direction = 1;
        else if(keyIsDown(DOWN_ARROW))
            direction = 2;
        else if(keyIsDown(LEFT_ARROW))
            direction = 3;
        else if(keyIsDown(RIGHT_ARROW))
            direction = 4;
        else
            direction = 0;
        this.move(posX, posY);
        this.attack(direction);

        
    }
}

class Monster extends LivingEntity {
    constructor(x, y, hp, damage, eyes, color, pngNum) {
        super(x, y, hp, color, pngNum);
        this.weapon = new Weapon(this, damage, 0, false);
        //this.inv.push();
        this.eyes = eyes;
        this.pathProgress = 100;
        this.currentDestination = createVector(Math.random() * 300 + 300, Math.random() * 300 + 300);
    }

    takeInput()
    {
        /*if(this.pathProgress >= 99)
        {
            this.currentDestination = createVector(Math.random() * 300 + 300, Math.random() * 300 + 300);
            console.log(this.currentDestination);
        }
        let normalized = createVector(this.pos.x - this.currentDestination.x, this.pos.y - this.currentDestination.y);
        normalized.normalize();
        normalized.mult(5);

        if(this.pos.x - this.currentDestination.x < 0)
            normalized.x = normalized.x * -1;

        if(this.pos.y - this.currentDestination.y < 0)
            normalized.y = normalized.y * -1;
        this.move(normalized.x, normalized.y);
        this.pathProgress = (abs(this.pos.x-this.currentDestination.x) + abs(this.pos.y - this.currentDestination.y));*/
    }

    update()
    {
        this.takeInput();

        if(this.hp <= 0)
            this.despawn = true;
    }
}

class Corpse extends LivingEntity {
    
}