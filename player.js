function toNum(b)
{
    return b == true ? 1 : 0;
}

class Player extends LivingEntity {
    constructor(x, y, weapon, color) {
        super(x, y, weapon, 100, ["black", "white"], color);
        this.eyes.push(new Eyeball(1, ["red", "blue", "green"], []));
        this.inv.push(new Weapon(10, 2, true));
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