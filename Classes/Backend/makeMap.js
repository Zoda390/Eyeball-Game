// ║ ═ ╝ ╚ ╗ ╔ ╩ ╦ ╣ ╠ ╬
/*
 ╔ 
 ║ 
 ║ 
*/
var rooms = {
    "0_0": new Room(0, [{x: 0, y: 0}, {x: 0, y: 0}, 0, 0], [createVector(0, 0), createVector(0, 0)], [[0,1]], [{name: "gremlinBug", x: 0, y: 0}]),
    "0_-1": new Room(0, [0, {x: 0, y: 0}, 0, {x: 0, y: 0}], [createVector(0, 0), createVector(0, 0)], [[0,1]], [{name: "gremlinBug", x: 0, y: 0}]),
    "0_1": new Room(0, [{x: 0, y: 0}, {x: 0, y: 0}, 0, 0], [createVector(0, 0), createVector(0, 0)], [[0,1]], [{name: "gremlinBug", x: 0, y: 0}]),
};