class CollisionManager
{
    constructor(player, enemies, attacks)
    {
        this.player = player;
        this.enemies = enemies;
        this.attacks = attacks;
    }

    simulate()
    {
        //check doors
        for(let door of rooms[CurrentRoomId].doors)
        {
            if(door !== 0){
                let left = player[0].bounds.getPointPos(0);
                let right = player[0].bounds.getPointPos(1);
                
                let leftFoot = door.bounds.contains(left.x, right.y);
                let rightFoot = door.bounds.contains(right.x, right.y);

                if(leftFoot || rightFoot)
                {
                    door.screenTransition();
                    return;
                }
            }
        }

        //check all attacks against all enemies/player
        this.livingEntityAttackCheck(player[0]);

        for(let enemy of this.enemies)
        {
            this.livingEntityAttackCheck(enemy);
        }
            
        //check pitfalls against enemies/player

        //check all entities against walls
        this.livingEntityWallCheck(player[0]);

        for(let entity of rooms[CurrentRoomId].entities)
        {
            this.livingEntityWallCheck(entity);
        }

        //attacks check
        for(let attack of rooms[CurrentRoomId].attacks)
        {
            let id = 0;
            for(let wall of rooms[CurrentRoomId].walls)
            {
                let point = attack.bounds.getPointPos(id);
                let touching = wall.contains(point.x, point.y); 
                if(touching)
                {
                    attack.despawn = true;
                    break;
                }
            }
        }
    }

    livingEntityAttackCheck(entity)
    {
        for(let attack of this.attacks)
        {
            if(attack.canHit(entity) && EntityCollider.anyIntersect(attack.bounds, entity.bounds))
            {
                attack.damage(entity);
            }
        }
    }

    livingEntityWallCheck(entity)
    {
        if(entity.pos.x < 0 || entity.pos.x > 900 || entity.pos.y < 0 || entity.pos.x > 900)
            entity.set(width/2, height/2);

        for(let wall of rooms[CurrentRoomId].walls)
        {
            let left = entity.bounds.getPointPos(0);
            let right = entity.bounds.getPointPos(1);

            let leftFoot = wall.contains(left.x, left.y);
            let rightFoot = wall.contains(right.x, right.y);

            let point;
            if(leftFoot && rightFoot)
                point = createVector((left.x + right.y)/2, (left.y + right.y)/2);
            else if(leftFoot)
                point = left;
            else if(rightFoot)
                point = right;
            else
                continue;

            this.livingEntityAdjust(entity, wall, point);
        }
    }

    livingEntityAdjust(entity, wall, intersectPoint)
    {
        let xHalf = wall.dimens.x/2, yHalf = wall.dimens.y/2;

        let left = abs(intersectPoint.x - wall.center.x + xHalf);
        let right = abs(intersectPoint.x - wall.center.x - xHalf);
        let top = abs(intersectPoint.y - wall.center.y + yHalf);
        let bottom = abs(intersectPoint.y - wall.center.y - yHalf);

        let horizMax = left < right ? left : right;
        let vertMax = top < bottom ? top : bottom;

        let min = horizMax < vertMax ? horizMax : vertMax;

        switch(min)
        {
            case left:
                entity.move(-(min + 0.01), 0);
                break;
            case right:
                entity.move((min + 0.01), 0);
                break;
            case top:
                entity.move(0, -(min + 0.01));
                break;
            case bottom:
                entity.move(0, (min + 0.01));
                break;
        }
    }
}