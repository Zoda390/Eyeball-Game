class Attack extends Entity
{
    constructor(x, y, direction, source)
    {
        super(x, y, "#FFFFFF");
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
        this.xVel = 0, this.yVel = 0;
        switch(this.direction)
        {
            case 1: this.yVel = -8; break;
            case 2: this.yVel = 8; break;
            case 3: this.xVel = -8; break;
            case 4: this.xVel = 8; break;
        }

        let yScale = this.direction == 1 || this.direction == 2 ? 0.5 : 1.1;
        let shadowY = this.pos.y + this.source.owner.bounds.dimens.y * 0.7 * yScale;
        this.bounds.points.push(createVector(this.pos.x, this.pos.y));
        this.bounds.points.push(createVector(this.pos.x, shadowY));
    }

    update()
    {
        this.move(this.xVel, this.yVel);
    }

    render()
    {
        super.render();
        layer2.push();
        layer2.fill(this.fillColor);
        layer2.circle(this.pos.x, this.pos.y, 15);
        layer2.fill("#1F1F29");
        layer2.ellipse(this.bounds.points[1].x, this.bounds.points[1].y, 15, 10);
        layer2.pop();
    }
}

class Swing extends Attack
{
    constructor(x, y, direction, source, length, duration)
    {
        super(x, y, direction, source);
        this.length = length;
        this.duration = duration;
        this.current = 0;
    }

    update()
    {
        
    }

    render()
    {
        super.render();

        layer2.push();
        layer2.fill(this.fillColor);
        arc
        
        this.bounds.render();
    }
}