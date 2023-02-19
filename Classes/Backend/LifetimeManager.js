class LifetimeManager
{
    constructor(enemies, attacks)
    {
        this.enemies = enemies
        this.attacks = attacks;
    }

    cleanse()
    {
        for(let i = 0; i < this.enemies.length; i++)
        {
            if(this.enemies[i].despawn)
            {
                this.enemies.splice(i, 1);
                i--;
            }
        }
        
        for(let i = 0; i < this.attacks.length; i++) 
        {
            if(this.attacks[i].despawn)
            {
                this.attacks.splice(i, 1);
                i--;
            }
        }
    }
}