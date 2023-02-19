function toNum(b)
{
    return b == true ? 1 : 0;
}

class Player extends LivingEntity {
    constructor(x, y, color) {
        super(x, y, 100, ["black", "white"], color);
        this.pngNum = 0;
        this.bounds.dimens = createVector(entityImgs[this.pngNum].width, entityImgs[this.pngNum].height);
        let corners = this.bounds.bottomCorners();
        this.bounds.points.push(createVector(corners.x, corners.y));
        this.bounds.points.push(createVector(corners.z, corners.y));

        this.eyes.push(new Eyeball(0));
        this.eyes.push(new Eyeball(1));
        this.weapon = new RangedWeapon(this, 0, -0.3, 10, 650, 0, false);
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