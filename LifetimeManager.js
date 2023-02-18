class LifetimeManager
{
    constructor(projectiles)
    {
        this.projectiles = projectiles;
    }

    cleanse()
    {
        for(let i = 0; i < this.projectiles.length; i++) {
            if(this.projectiles[i].despawn)
            {
                this.projectiles.splice(i, 1);
                i--;
            }
        }
    }
}