class EntityCollider
{
    static visualize = false;
    constructor(centerX, centerY, width, height)
    {
        this.center = createVector(centerX, centerY);
        this.dimens = createVector(width, height);
        this.points = [];
    }

    setPos(point)
    {
        this.center = point;
    }

    shiftPos(point)
    {
        this.center.add(point);
    }

    getPointPos(index)
    {
        return createVector(this.center.x + this.points[index].x, this.center.y + this.points[index].y);
    }

    render()
    {
        if(!EntityCollider.visualize)
            return;
            
        layerdb.push();
        layerdb.fill(255, 0, 0, 100);
        layerdb.stroke(255, 0, 0, 255);
        layerdb.rectMode(CENTER);
        layerdb.rect(this.center.x, this.center.y, this.dimens.x, this.dimens.y);
        layerdb.fill(0, 255, 0, 100);
        layerdb.stroke(0, 255, 0, 255);
        for(let index in this.points)
        {
            let point = this.getPointPos(index);
            layerdb.circle(point.x, point.y, 10);
        }

        layerdb.pop();
    }

    bottomCorners()
    {
        return createVector(this.center.x - this.dimens.x/2, this.center.y + this.dimens.y/2, this.center.x + this.dimens.x/2);
    }

    contains(x, y)
    {
        let corners = this.bottomCorners();
        let horizBounds = (x >= corners.x) && (x <= corners.z);
        let vertBounds = (y <= corners.y) && (y >= corners.y - this.dimens.y);
        return (horizBounds && vertBounds);
    }

    containsCollider(collider)
    {
        let otherBottoms = collider.bottomCorners();
        let otherCorners = [
            [otherBottoms.x, otherBottoms.y - collider.dimens.y], 
            [otherBottoms.z, otherBottoms.y - collider.dimens.y], 
            [otherBottoms.x, otherBottoms.y], 
            [otherBottoms.z, otherBottoms.y]
        ];

        for(let point of otherCorners)
            if(this.contains(point[0], point[1]))
                return true;
        return false;
    }

    static anyIntersect(a, b)
    {
        return a.contains(b.center.x, b.center.y) || b.contains(a.center.x, a.center.y) || a.containsCollider(b) || b.containsCollider(a);
    }

    static centerIntersect(pusher, holder)
    {
        return holder.contains(pusher.center.x, pusher.center.y);
    }
}