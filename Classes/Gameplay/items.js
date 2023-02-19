var allEyes = [];

class Item {
    constructor(pngNum, pickup) {
        this.pngNum = pngNum; //index of image found in itemImgs[]
        this.pickup = pickup; //bool for if this item can be taken out of an inv
    }

    render(x, y){
        layer4.push();
        layer4.image(itemImgs[this.pngNum][0], x, y);
        layer4.pop();
    }
}

class Eyeball extends Item {
    constructor(pngNum) {
        super(pngNum, true);
    }
}

class Weapon extends Item {
    constructor(owner, x, y, damage, knockback, duration, cooldown, pngNum, pickup, attackType, a, b, c) {
        super(pngNum, pickup);
        this.origin = createVector(x, y);
        this.owner = owner;
        this.damage = damage; //amount of hp this weapon does
        this.knockback = knockback;

        this.duration = duration
        this.cooldown = cooldown;
        this.lastShot = 0;

        this.attackType = attackType;
        this.a = a;
        this.b = b;
        this.c = c;
    }

    use(direction) {
        let time = Date.now();
        if(direction != 0 && time - this.lastShot > this.cooldown)
        {
            let atks = rooms[CurrentRoomId].attacks;
            let x = this.owner.bounds.center.x + (this.origin.x * this.owner.bounds.dimens.x);
            let y = this.owner.bounds.center.y + (this.origin.y * this.owner.bounds.dimens.y);

            switch(this.attackType){
                case "Swing":
                    atks.push(new Swing(x, y, direction, this, this.a, this.b, this.c));
                    break;
                case "Projectile":
                    atks.push(new Projectile(x, y, direction, this))
                    break;
                case "Mental":
                    atks.push(new Mental(x, y, direction, this, this.a))
                    break;
            }
            this.lastShot = time;
        }
    }
}