class Attack extends Entity
{
    constructor(x, y, direction, source)
    {
        super(x, y, "#FFFFFF");
        this.despawn = false;
        this.direction = direction;
        this.source = source;
        
        this.bounds.dimens.x /= 2;
        this.bounds.dimens.y /= 2;
    }
}

class Projectile extends Attack
{
    constructor(x, y, direction, source)
    {
        super(x, y, direction, source);
    }

    update()
    {
        let x = 0, y = 0;
        switch(this.direction)
        {
            case 1: y = -8; break;
            case 2: y = 8; break;
            case 3: x = -8; break;
            case 4: x = 8; break;
        }

        this.move(x, y);

        if(this.x < 0 || this.x > width || this.y < 0 || this.y > height)
            this.despawn = true;
    }

    render()
    {
        super.render();
        layer2.push();
        layer2.circle(this.pos.x, this.pos.y, 15);
        layer2.pop();
    }
}