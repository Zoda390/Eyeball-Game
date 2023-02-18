// ║ ═ ╝ ╚ ╗ ╔ ╩ ╦ ╣ ╠ ╬

/*
 ╔ 
 ║ 
 ║ 
*/

var rooms = {};
var CurrentRoomId = "0_0";

function makeMap(){
    rooms = {
        "0_0": new Room(0, [{x: 493, y: 243}, {x: 501, y: 912}, 0, 0], [createVector(0, 0), createVector(0, 0)], [[0,1]], [{name: "GremlinBug", x: 100, y: 400}]),
        "0_-1": new Room(0, [0, {x: 0, y: 0}, 0, {x: 0, y: 0}], [createVector(0, 0), createVector(0, 0)], [[0,1]], [{name: "GremlinBug", x: 0, y: 0}]),
        "0_1": new Room(0, [{x: 0, y: 0}, {x: 0, y: 0}, 0, 0], [createVector(0, 0), createVector(0, 0)], [[0,1]], [{name: "GremlinBug", x: 500, y: 0}]),
    };
}