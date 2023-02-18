var allEyes = [];

class Item {
    constructor(pngNum, pickup) {
        this.pngNum = pngNum; //index of image found in itemImgs[]
        this.pickup = pickup; //bool for if this item can be taken out of an inv
    }

    render(x, y){
        push();
        image(itemImgs[this.pngNum][0], x, y);
        pop();
    }
}

class Eyeball extends Item {
    constructor(pngNum) {
        super(pngNum, true);
    }
}

class Weapon extends Item {
    constructor(owner, x, y, damage, pngNum, pickup) {
        super(pngNum, pickup);
        this.owner = owner;
        this.damage = damage; //amount of hp this weapon does
        this.origin = createVector(x, y);
    }

    use(x, y, direction) {};
}

class Melee extends Weapon {
    
}

class RangedWeapon extends Weapon {
    constructor(owner, x, y, damage, cooldown, pngNum, pickup) {
        super(owner, x, y, damage, pngNum, pickup); //sus
        this.cooldown = cooldown;
        this.lastShot = 0;
    }

    use(x, y, direction) {
        let time = Date.now();
        if(direction != 0 && time - this.lastShot > this.cooldown)
        {
            rooms[CurrentRoomId].attacks.push(new Projectile(x, y, direction, this));
            this.lastShot = time;
        }
    }
}