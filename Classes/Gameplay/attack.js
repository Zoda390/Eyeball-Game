class Attack extends Entity
{
    constructor(x, y, direction, source)
    {
        super(x, y, "#FFFFFF");
        this.direction = direction;
        this.source = source;
        this.whitelist = [source.owner];
        this.creationTime = Date.now();
    }
    
    damage(entity)
    {
        entity.hp -= this.source.damage;
    }

    knockback(entity)
    {
        let x = 0, y = 0;
        switch(this.direction)
        {
            case 1: y = -this.source.knockback; break;
            case 2: y = +this.source.knockback; break;
            case 3: x = -this.source.knockback; break;
            case 4: x = +this.source.knockback; break;
        }

        entity.move(x, y);
    }

    update()
    {
        if(Date.now() - this.source.duration > this.creationTime)
            this.despawn = true;
    }

    canHit(entity)
    {
        for(let ent of this.whitelist)
            if(entity == ent)
                return false;
        return true;
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
        let shadowY = this.source.owner.bounds.dimens.y * 0.7 * yScale;
        this.bounds.points.push(createVector(0, shadowY));
    }

    damage(entity)
    {
        super.damage(entity);
        super.knockback(entity);
        this.whitelist.push(entity);
        this.despawn = true;
    }

    update()
    {
        super.update();
        this.move(this.xVel, this.yVel);
    }

    render()
    {
        super.render();
        layer2.push();
        layer2.fill(this.fillColor);
        layer2.circle(this.pos.x, this.pos.y, 15);
        layer2.fill("#1F1F29");
        let point = this.bounds.getPointPos(0);
        layer2.ellipse(point.x, point.y, 15, 10);
        layer2.pop();
    }
}

class Swing extends Attack
{
    constructor(x, y, direction, source, width, length)
    {
        super(x, y, direction, source);
        this.length = length;
        this.width = width;

        this.xTip = 0;
        this.yTip = 0;
        switch(this.direction)
        {
            case 1: this.yTip -= this.length; break;

            case 2: this.yTip += this.length; break;

            case 3: this.xTip -= this.length; break;

            case 4: this.xTip += this.length; break;
        }

        if(this.direction == 1 || this.direction == 2)
        {
            this.bounds.dimens.x = this.width;
            this.bounds.dimens.y = abs(this.yTip);
            this.bounds.center.y += this.yTip/2;
        }
        else
        {
            this.bounds.dimens.x = abs(this.xTip);
            this.bounds.dimens.y = this.width;
            this.bounds.center.x += this.xTip/2;    
        }
        this.bounds.points.push(createVector(this.xTip/2, this.yTip/2));
    }

    damage(entity)
    {
        super.damage(entity);
        super.knockback(entity);
        this.whitelist.push(entity);
    }

    update()
    {
        super.update();
        this.set(this.source.owner.pos.x + (this.source.origin.x * this.source.owner.bounds.dimens.x) + this.xTip/2, this.source.owner.pos.y + (this.source.origin.y * this.source.owner.bounds.dimens.y) + this.yTip/2);
    }

    render()
    {
        super.render();

        layer2.push();
        layer2.rectMode(CENTER);
        layer2.fill(this.fillColor);
        layer2.rect(this.pos.x, this.pos.y, this.bounds.dimens.x, this.bounds.dimens.y);
        this.bounds.render();
    }
}

class Mental extends Attack
{
    constructor(x, y, direction, source, radius)
    {
        super(x, y, direction, source);
        this.max = radius;
        this.radius = 0;
        this.pullThresh = 30;
        this.progress = 0;

        this.bounds.points.push(createVector(0, 0));
        this.bounds.dimens = createVector(0, 0);
    }

    damage(entity)
    {
        super.damage(entity);
        let kb = this.calculatePull(entity);
        entity.move(kb.x, kb.y);
    }

    update()
    {
        super.update();

        this.updateRadius();

        this.set(this.source.owner.pos.x + (this.source.origin.x * this.source.owner.bounds.dimens.x), this.source.owner.pos.y + (this.source.origin.y * this.source.owner.bounds.dimens.y));
    }

    updateRadius()
    {
        let time = Date.now();
        this.progress = (time - this.creationTime) / this.source.duration;
        this.radius = sin(PI * this.progress) * this.max;
        this.bounds.dimens.x = this.radius;
        this.bounds.dimens.y = this.radius;
    }

    calculatePull(entity)
    {
        console.log(this.progress * 100);
        if(this.progress * 100 < this.pullThresh)
            return createVector(0, 0);
        this.pullThresh += 20;
        console.log(this.pullThresh);
        let normalized = createVector(this.pos.x - entity.pos.x, this.pos.y - entity.pos.y);
        normalized.normalize();
        normalized.mult(this.source.knockback);
        return(normalized);
    }

    render()
    {
        super.render();
        layer2.push();
        layer2.fill(this.fillColor);
        layer2.circle(this.pos.x, this.pos.y, 15);
        layer2.fill("#1F1F29");
        let point = this.bounds.getPointPos(0);
        layer2.ellipse(point.x, point.y, 15, 10);
        layer2.pop();
    }
}