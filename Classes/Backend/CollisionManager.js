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
                    }
                }
            }
        }

        //check pitfalls against enemies/player

        //check all entities against walls

    }
}