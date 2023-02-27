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
        this.facing = 0;
        this.direction = 0;
        this.frame = 0;
        this.mframe = 3;

        this.bounds.dimens = createVector(entityImgs[this.pngNum][0].width, entityImgs[this.pngNum][0].height);
        let corners = this.bounds.bottomCorners();
        this.bounds.points.push(createVector(corners.x - this.bounds.center.x, corners.y - this.bounds.center.y));
        this.bounds.points.push(createVector(corners.z - this.bounds.center.x, corners.y - this.bounds.center.y));

        
        let swg = new Weapon(this, 0, 0, 25, 70, 250, 1000, 9, false, "Swing", 60, 100, 250);
        let mnt = new Weapon(this, 0, -0.3, 0.3, 100, 4000, 5000, 10, false, "Mental", 300, 100, 250);
        let prj = new Weapon(this, 0, -0.3, 10, 20, 10000, 400, 11, false, "Projectile", 60, 100, 250);
        
        this.weapon = swg;
        this.inv.push(swg, mnt, prj)
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
        if(Date.now() - this.inv[0].lastShot >= this.inv[0].cooldown){
            this.weapon = this.inv[0];
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

        this.inv.push(new Eyeball(2), new Eyeball(3), new Eyeball(4), new Eyeball(5), new Eyeball(6), new Eyeball(7), new Eyeball(8), 0, 0);
    }

    takeInput()
    {
        let posX, posY;
        posX = -1 * toNum(keyIsDown(65)) + toNum(keyIsDown(68));
        posY = -1 * toNum(keyIsDown(87)) + toNum(keyIsDown(83));

        posX *= 5;
        posY *= 5;

        if(keyIsDown(UP_ARROW))
            this.direction = 1;
        else if(keyIsDown(DOWN_ARROW))
            this.direction = 2;
        else if(keyIsDown(LEFT_ARROW))
            this.direction = 3;
        else if(keyIsDown(RIGHT_ARROW))
            this.direction = 4;
        else
            this.direction = 0;
        this.move(posX, posY);
        this.attack(this.direction);        
    }
}

class Monster extends LivingEntity {
    constructor(x, y, hp, damage, eyes, color, pngNum) {
        super(x, y, hp, color, pngNum);
        
        this.eyes = eyes;
        this.pathAccuracy = 5;
        this.closeToPlayer = false;
        this.currentDestination = createVector(Math.random() * 300 + 300, Math.random() * 300 + 300);

        let temp = this.inv[0];
        this.inv[0] = this.inv[0];
        this.inv[0] = temp;
        this.weapon = this.inv[0];
        console.log(this.weapon);
    }

    takeInput()
    {
        let diff = createVector((this.currentDestination.x - this.pos.x), (this.currentDestination.y - this.pos.y));
        let distance = this.pos.dist(this.currentDestination);
        if(distance <= this.pathAccuracy)
        {
            this.currentDestination = createVector(Math.random() * 300 + 300, Math.random() * 300 + 300);
        }

        diff.normalize();
        this.move(diff.x, diff.y);
    }

    updateCloseness()
    {
        let diff = createVector((player[0].pos.x - this.pos.x), (player[0].pos.y - this.pos.y));
        let distance = this.pos.dist(player[0].pos);
        diff.normalize();
        this.closeToPlayer = distance <= 100;

        if(abs(diff.x) > abs(diff.y))
            if(diff.x > 0)
                this.direction = 4;
            else
                this.direction = 3;
        else
            if(diff.y > 0)
                this.direction = 2;
            else
                this.direction = 1;
    }

    update()
    {
        this.takeInput();
        console.log(this.weapon);

        this.updateCloseness();

        if(this.weapon.attackType == "Projectile" || this.weapon.attackType == "Mental" || (this.weapon.attackType == "Swing" && this.closeToPlayer))
        {
            this.attack(this.direction);
        }

        console.log(this.direction);

        if(this.hp <= 0)
            this.despawn = true;
    }
}

class Corpse extends LivingEntity {
    
}