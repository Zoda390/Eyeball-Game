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
                temp.push(new Monster(objs[i].x, objs[i].y, 100, 10, [allEyes[floor(random(0, allEyes.length))]], "#000000"));
            }
            if(objs[i].name == "eyeFloater"){
                temp.push(new Monster(objs[i].x, objs[i].y, 100, 10, [allEyes[floor(random(0, allEyes.length))]], "#000000"));
            }
            if(objs[i].name == "tallBug"){
                temp.push(new Monster(objs[i].x, objs[i].y, 200, 10, [allEyes[floor(random(0, allEyes.length))], allEyes[floor(random(0, allEyes.length))]], "#000000"));
            }
            if(objs[i].name == "GremlinBug"){
                temp.push(new Monster(objs[i].x, objs[i].y, 100, 10, [allEyes[floor(random(0, allEyes.length))], allEyes[floor(random(0, allEyes.length))]], "#000000"));
                temp[temp.length-1].pngNum = 1;
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
        player[0].takeInput();
        for(let i = 0; i < this.attacks.length; i++) {
            this.attacks[i].update();
        }
        this.lifeManager.cleanse();

        //collision
        this.collisions.simulate();
    }
    
    render(){
        //draw
        layer0.image(bgImgs[this.pngNum], 0, 0);
        for(let i = 0; i<this.entities.length; i++) {
            this.entities[i].render();
        }
        
        player[0].render();

        for(let i = 0; i < this.attacks.length; i++) {
            this.attacks[i].render();
        }

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
            this.bounds = new EntityCollider(x+(135/2), y-(250/2)-130, 135, 250);
        }
        if(direction == 1){ //down
            this.bounds = new EntityCollider(x+(135/2)-7, y+(50/2)+30, 135, 50);
        }
        if(direction == 2){ //left
            this.bounds = new EntityCollider(x+(135/2), y-(250/2)-20, 250, 135);
        }
        if(direction == 3){ //right
            this.bounds = new EntityCollider(x+(135/2)-7, y+(50/2)-10, 50, 135);
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
        //console.log(temp[1])
        player[0].move(-x*(width), -y*(height+400));

        //smooth transition here?
        CurrentRoomId = temp[0] + "_" + temp[1];
    }
}