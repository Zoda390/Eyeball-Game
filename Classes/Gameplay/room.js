class Room{
    constructor(pngNum, doors, wallCorners, wallEdges, entityObjs){
        this.pngNum = pngNum;
        this.doors = doors;
        for(let i = 0; i<4; i++){
            if(this.doors[i] != 0){
                this.doors[i] = new Door(i, this.doors[i].x, this.doors[i].y);
            }
        }
        this.wallCorners = wallCorners;
        this.wallEdges = wallEdges;
        this.entities = this.namesToEntities(entityObjs);
        this.attacks = [];
    }

    objsToEntities(objs){
        let temp = [];
        for(let i = 0; i < objs.length; i++){
            if(objs[i].name = "eyeWalker"){
                temp.push(new Monster(objs[i].x, objs[i].y, 100, [], 10, [allEyes[floor(random(0, allEyes.length))]], "#000000", createVector(0,0)));
            }
            if(objs[i].name = "eyeFloater"){
                temp.push(new Monster(objs[i].x, objs[i].y, 100, [], 10, [allEyes[floor(random(0, allEyes.length))]], "#000000", createVector(0,0)));
            }
            if(objs[i].name = "tallBug"){
                temp.push(new Monster(objs[i].x, objs[i].y, 200, [], 10, [allEyes[floor(random(0, allEyes.length))], allEyes[floor(random(0, allEyes.length))]], "#000000", createVector(0,0)));
            }
            if(objs[i].name = "GremlinBug"){
                temp.push(new Monster(objs[i].x, objs[i].y, 100, [], 10, [allEyes[floor(random(0, allEyes.length))], allEyes[floor(random(0, allEyes.length))]], "#000000", createVector(0,0)));
            }
            if(objs[i].name = "pitfallTrap"){
                temp.push(new Entity(objs[i].x, objs[i].y, "#0000FFFF"));
            }
            if(objs[i].name = "SecretDoor"){
                temp.push(new Entity(objs[i].x, objs[i].y, "#FF00FFFF"));
            }
        }
        return temp;
    }

    render(){
        //draw
        layer0.image(bgImgs[this.pngNum], 0, 0);
        for(let i = 0; i<this.entities.length; i++) {
            this.entities[i].render();
        }
        
        player.render();

        for(let i = 0; i < this.attacks.length; i++) {
            this.attacks[i].render();
        }
    }
}

class Door{
    constructor(direction, x, y){
        this.pos = createVector(x, y);
        this.direction = direction;
    }
}