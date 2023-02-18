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
    constructor(pngNum, visibleColors, colorReplace) {
        super(pngNum, true);
        this.visibleColors = visibleColors; //array of colors this eye can see
        this.colorReplace = colorReplace; //array of color replacments this eye makes (ex. [["red", "blue"], ["blue", "red"]])
    }
}

class Weapon extends Item {
    constructor(damage, pngNum, pickup) {
        super(pngNum, pickup);
        this.damage = damage; //amount of hp this weapon does
    }

    use(x, y, direction) {};
}

class RangedWeapon extends Weapon {
    constructor(damage, cooldown, pngNum, pickup) {
        super(damage, pngNum, pickup); //sus
        this.cooldown = cooldown;
    }

    use(x, y, direction) {
        attacks.push(new Projectile(x, y, direction));
    }
}