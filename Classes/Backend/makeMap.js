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
        "0_0": new Room(0, [{x: 493, y: 243}, {x: 501, y: 912}, 0, 0], [[createVector(0, 0), createVector(360, 400)], [createVector(-20, 300), createVector(40, 1100)], [createVector(0, 950), createVector(500, 1050)], [createVector(620, 950), createVector(1200, 1000)], [createVector(320, 0), createVector(490, 240)], [createVector(630, 0), createVector(800, 240)], [createVector(760, 0), createVector(1200, 400)], [createVector(1080, 300), createVector(1200, 1000)]], [{name: "GremlinBug", x: 300, y: 700}]),
        "0_-1": new Room(0, [{x: 493, y: 243}, {x: 501, y: 912}, 0, 0], [[createVector(0, 0), createVector(360, 400)], [createVector(-20, 300), createVector(40, 1100)], [createVector(0, 950), createVector(500, 1050)], [createVector(620, 950), createVector(1200, 1000)], [createVector(320, 0), createVector(490, 240)], [createVector(630, 0), createVector(800, 240)], [createVector(760, 0), createVector(1200, 400)], [createVector(1080, 300), createVector(1200, 1000)]], [{name: "GremlinBug", x: 600, y: 700}]),
        "0_1": new Room(0, [{x: 493, y: 243}, {x: 501, y: 912}, 0, 0], [[createVector(0, 0), createVector(360, 400)], [createVector(-20, 300), createVector(40, 1100)], [createVector(0, 950), createVector(500, 1050)], [createVector(620, 950), createVector(1200, 1000)], [createVector(320, 0), createVector(490, 240)], [createVector(630, 0), createVector(800, 240)], [createVector(760, 0), createVector(1200, 400)], [createVector(1080, 300), createVector(1200, 1000)]], [{name: "GremlinBug", x: 300, y: 800}]),
    };
}