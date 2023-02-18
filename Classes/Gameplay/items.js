class Item {
    constructor(pngNum, pickup) {
        this.pngNum = pngNum; //index of image found in itemImgs[]
        this.pickup = pickup; //bool for if this item can be taken out of an inv
    }

    render(x, y){
        push();
        image(itemImgs[this.pngNum], x, y);
        pop();
    }
}

class Eyeball extends Item {
    constructor(pngNum) {
        super(pngNum, true);
    }
}

class Weapon extends Item {
    constructor(owner, damage, pngNum, pickup) {
        super(pngNum, pickup);
        this.owner = owner;
        this.damage = damage; //amount of hp this weapon does
    }

    use(x, y, direction) {};
}

class RangedWeapon extends Weapon {
    constructor(owner, damage, cooldown, pngNum, pickup) {
        super(owner, damage, pngNum, pickup); //sus
        this.cooldown = cooldown;
        this.lastShot = 0;
    }

    use(x, y, direction) {
        let time = Date.now();
        if(time - this.lastShot > this.cooldown)
        {
            attacks.push(new Projectile(x, y, direction, this));
            this.lastShot = time;
        }
    }
}