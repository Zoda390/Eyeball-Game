class Room{
    constructor(pngNum, doors, wallCorners, entityObjs){
        this.pngNum = pngNum;
        this.doors = doors;
        for(let i = 0; i<4; i++){
            if(this.doors[i] != 0){
                this.doors[i] = new Door(i, this.doors[i].x, this.doors[i].y);
            }
        }
        this.wallCorners = wallCorners;
        this.walls = this.cornersToWalls(this.wallCorners);
        this.entities = this.objsToEntities(entityObjs);
        this.attacks = [];
        this.lifeManager = new LifetimeManager(this.entities, this.attacks);
        this.collisions = new CollisionManager(player, this.entities, this.attacks);
    }

    objsToEntities(objs){
        let temp = [];
        for(let i = 0; i < objs.length; i++){
            if(objs[i].name == "eyeWalker"){
                temp.push(new Monster(objs[i].x, objs[i].y, 100, 10, [allEyes[floor(random(0, allEyes.length))]], "#000000", 2));
            }
            if(objs[i].name == "eyeFloater"){
                temp.push(new Monster(objs[i].x, objs[i].y, 100, 10, [allEyes[floor(random(0, allEyes.length))]], "#000000", 4));
            }
            if(objs[i].name == "tallBug"){
                temp.push(new Monster(objs[i].x, objs[i].y, 200, 10, [allEyes[floor(random(0, allEyes.length))], allEyes[floor(random(0, allEyes.length))]], "#000000", 3));
            }
            if(objs[i].name == "GremlinBug"){
                temp.push(new Monster(objs[i].x, objs[i].y, 100, 10, [allEyes[floor(random(0, allEyes.length))], allEyes[floor(random(0, allEyes.length))]], "#000000", 1));
            }
            if(objs[i].name == "pitfallTrap"){
                temp.push(new Entity(objs[i].x, objs[i].y, "#0000FFFF"));
            }
            if(objs[i].name == "SecretDoor"){
                temp.push(new Entity(objs[i].x, objs[i].y, "#FF00FFFF"));
            }
        }
        return temp;
    }

    cornersToWalls(coreners){
        let temp = [];
        for(let i = 0; i < coreners.length; i++){
            temp.push(new EntityCollider((coreners[i][0].x + coreners[i][1].x)/2, (coreners[i][0].y + coreners[i][1].y)/2, abs(coreners[i][0].x - coreners[i][1].x), abs(coreners[i][0].y - coreners[i][1].y)));
        }
        return temp;
    }

    update(){
        //update
        if(!uim.showInv){
            player[0].takeInput();
        }

        for(let i = 0; i < this.entities.length; i++) {
            this.entities[i].update();
        }

        for(let i = 0; i < this.attacks.length; i++) {
            this.attacks[i].update();
        }
        this.lifeManager.cleanse();

        //collision
        this.collisions.simulate();
    }
    
    render(){
        //draw
        layer0.image(bgImgs[this.pngNum][0], 0, 0);
        for(let i = 0; i<this.entities.length; i++) {
            this.entities[i].render();
        }
        
        player[0].render();

        for(let i = 0; i < this.attacks.length; i++) {
            this.attacks[i].render();
        }
        layer2.image(bgImgs[this.pngNum][1], 0, 0);

        for(let i = 0; i < this.walls.length; i++){
               this.walls[i].render();
        }
        for(let i = 0; i < this.doors.length; i++)
        {
            if(this.doors[i] != 0)
                this.doors[i].render();
        }
    }
}

class Door{
    constructor(direction, x, y){
        this.pos = createVector(x, y);
        this.direction = direction;
        if(direction == 0){ //up
            this.bounds = new EntityCollider(x+(102/2), y-(150/2)-78, 102, 150);
        }
        if(direction == 1){ //down
            this.bounds = new EntityCollider(x+(102/2)-7, y+(150/2)+60, 102, 150);
        }
        if(direction == 2){ //left
            this.bounds = new EntityCollider(x-(150/2)-24, y-(102/2), 150, 102);
        }
        if(direction == 3){ //right
            this.bounds = new EntityCollider(x+(150/2)+24, y-(102/2), 150, 102);
        }
    }

    render(){
        this.bounds.render();
    }

    screenTransition(){
        let x = 0;
        let y = 0;
        switch(this.direction)
        {
            case 0: y = -1; break;
            case 1: y = 1; break;
            case 2: x = -1; break;
            case 3: x = 1; break;
        }
        let temp = CurrentRoomId.split("_");
        temp[0] = parseInt(temp[0]);
        temp[1] = parseInt(temp[1]);
        temp[0] += x;
        temp[1] += y;
        let tdoor = rooms[(temp[0] + "_" + temp[1])].doors[this.flipDirection(this.direction)];
        player[0].pos = createVector(tdoor.pos.x + (x==0?(tdoor.bounds.dimens.x/2):0) + (x*100), tdoor.pos.y + (y==0?(tdoor.bounds.dimens.y/2):0) + (y*100));
        player[0].bounds.center = createVector(tdoor.pos.x + (x==0?(tdoor.bounds.dimens.x/2):0) + (x*100), tdoor.pos.y + (y==0?(tdoor.bounds.dimens.y/2):0) + (y*100));

        //smooth transition here?
        CurrentRoomId = temp[0] + "_" + temp[1];
    }

    flipDirection(d){
        switch(d){
            case 0: return 1;
            case 1: return 0;
            case 2: return 3;
            case 3: return 2;
        }
    }
}