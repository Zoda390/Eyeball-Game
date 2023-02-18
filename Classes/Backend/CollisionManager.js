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
                let leftFoot = door.bounds.contains(player[0].bounds.points[0].x, player[0].bounds.points[0].y);
                let rightFoot = door.bounds.contains(player[0].bounds.points[1].x, player[0].bounds.points[1].y);

                if(leftFoot || rightFoot)
                {
                    door.screenTransition();
                    return;
                }
            }
        }

        //check all attacks against all enemies/player
        for(let i = 0; i < this.attacks.length; i++)
        {
            if(this.player[0] != this.attacks[i].source.owner)
            {
                if(EntityCollider.anyIntersect(this.attacks[i].bounds, this.player[0].bounds))
                {
                    this.player[0].hp -= this.attacks[i].source.damage;
                    this.attacks[i].despawn = true;

                    let x = 0, y = 0;
                    switch(dir)
                    {
                        case 1: y = -8; break;
                        case 2: y = 8; break;
                        case 3: x = -8; break;
                        case 4: x = 8; break;
                        this.player[0].move(x, y);
                    }
                }
            }

            for(let j = 0; j < this.enemies.length; j++)
            {
                if(this.enemies[j] != this.attacks[i].source.owner)
                {
                    if(EntityCollider.anyIntersect(this.attacks[i].bounds, this.enemies[j].bounds))
                    {
                        this.enemies[j].hp -= this.attacks[i].source.damage;
                        this.attacks[i].despawn = true;

                        let dir = this.attacks[i].direction;
                        let x = 0, y = 0;

                        switch(dir)
                        {
                            case 1: y = -8; break;
                            case 2: y = 8; break;
                            case 3: x = -8; break;
                            case 4: x = 8; break;
                        }
                        this.enemies[j].move(x, y);

                        if(this.enemies[j].hp <=0)
                            this.enemies[j].despawn = true;
                    }
                }
            }
        }

        //check pitfalls against enemies/player

        //check all entities against walls
        //player check
        for(let wall of rooms[CurrentRoomId].walls)
        {
            let leftFoot = wall.contains(player[0].bounds.points[0].x, player[0].bounds.points[0].y);
            let rightFoot = wall.contains(player[0].bounds.points[1].x, player[0].bounds.points[1].y);

            if(leftFoot)
                this.playerCheck(wall, 0);
            if(rightFoot)
                this.playerCheck(wall, 1);
        }

        //attacks check
        for(let attack of rooms[CurrentRoomId].attacks)
        {
            let id = 1;
            for(let wall of rooms[CurrentRoomId].walls)
            {
                let touching = wall.contains(attack.bounds.points[id].x, attack.bounds.points[id].y); //EntityCollider.centerIntersect(attack.bounds, wall) //EntityCollider.anyIntersect(wall, attack.bounds)
                if(touching)
                {
                    attack.despawn = true;
                    break;
                }
            }
        }
        

        //for(let i = 0; i < this.enemies.length; i++)
            //wall.restrict(this.enemies[i]);

        for(let i = 0; i < this.attacks.length; i++)
        {
            let checking = this.attacks[i].bounds.points[0];
            if(this.attacks[i].direction == 1)
                checking = this.attacks[i].bounds.points[1];
        }
    }

    playerCheck(wall, foot)
    {
        let boxRatio = wall.dimens.x/wall.dimens.y;
        let xdiff = player[0].bounds.points[foot].x - wall.center.x;
        let ydiff = player[0].bounds.points[foot].y - wall.center.y;

        let slope = xdiff/ydiff;
        if(slope > -boxRatio && slope < boxRatio)
        {
            let flip = ydiff < 0 ? 1 : -1;
            player[0].move(0, -(ydiff + (flip * wall.dimens.y)/2));
        }
        else
        {
            let flip = xdiff < 0 ? 1 : -1;
            player[0].move(-(xdiff + (flip * wall.dimens.x)/2), 0);
        }
    }
}