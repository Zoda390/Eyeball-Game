class EntityCollider
{
    static visualize = true;

    constructor(centerX, centerY, width, height)
    {
        this.center = createVector(centerX, centerY);
        this.dimens = createVector(height, width);
    }

    shiftPos(point)
    {
        this.center.add(point);
    }

    render()
    {
        layerdb.push();
        layerdb.fill(255, 0, 0, 100);
        layerdb.stroke(255, 0, 0, 255);
        layerdb.rectMode(CENTER);
        layerdb.rect(this.center.x, this.center.y, this.dimens.x, this.dimens.y);
        layerdb.fill(0, 255, 0, 100);
        layerdb.stroke(0, 255, 0, 255);
        let temp = this.bottomCorners();

        layerdb.circle(temp.x, temp.y, 10);
        layerdb.circle(temp.z, temp.y, 10);

        layerdb.pop();
    }

    bottomCorners()
    {
        return createVector(this.center.x - this.dimens.x/2, this.center.y + this.dimens.y/2, this.center.x + this.dimens.x/2);
    }

    contains(x, y)
    {
        let corners = this.bottomCorners();
        let horizBounds = x > corners.x && x < corners.z;
        let vertBounds = y < corners.y && y > corners.y - this.dimens.y;

        return horizBounds && vertBounds;
    }

    containsCollider(collider)
    {
        let otherBottoms = collider.bottomCorners();
        let otherCorners = [[otherBottoms.x, otherBottoms.y - collider.dimens.y], [otherBottoms.z, otherBottoms.y - collider.dimens.y], [otherBottoms.x, otherBottoms.y], [otherBottoms.z, otherBottoms.y]];

        for(let point of otherCorners)
            if(this.contains(point[0], point[1]))
                return true;
        return false;
    }

    static anyIntersect(a, b)
    {
        return a.containsCollider(b) || b.containsCollider(a);
    }

    static centerIntersect(pusher, holder)
    {
        return holder.contains(pusher.center.x, pusher.center.y);
    }

    static feetIntersect(footHaver, other)
    {
        let cornerData = footHaver.bottomCorners();
        return other.contains(cornerData.x, cornerData.y) && other.contains(cornerData.z, cornerData.y);
    }
}