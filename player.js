class Player extends Entity {
    constructor(x, y) {
        super(x, y, 100, ["black", "white"]);
        this.eyes.push(new Eyeball(1, ["red", "blue", "green"], []));
        this.inv.push(new Weapon(10, 2, true));
    }
}