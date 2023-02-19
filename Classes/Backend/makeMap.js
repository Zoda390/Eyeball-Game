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
        "0_0": new Room(0, [{x: 665, y: 298}, {x: 675, y: 1339}, 0, 0], [
            [createVector(0, 0), createVector(500, 500)],
            [createVector(0, 400), createVector(100, 1500)],
            [createVector(0, 1400), createVector(664, 1500)],
            [createVector(835, 1400), createVector(1500, 1500)],
            [createVector(1400, 400), createVector(1500, 1500)],
            [createVector(1000, 0), createVector(1500, 500)],
            [createVector(400, 0), createVector(665, 298)],
            [createVector(835, 0), createVector(1100, 298)],
            [createVector(1105, 400), createVector(1500, 589)],
            [createVector(1225, 500), createVector(1500, 687)],
        ], [{name: "GremlinBug", x: 300, y: 700}]),
        "0_-1": new Room(1, [{x: 465, y: 300}, {x: 475, y: 1439}, 0, 0], [
            [createVector(0, 0), createVector(198, 498)],
            [createVector(0, 0), createVector(299, 399)],
            [createVector(0, 0), createVector(464, 300)],
            [createVector(0, 400), createVector(100, 1500)],
            [createVector(0, 1250), createVector(198, 1500)],
            [createVector(0, 1350), createVector(298, 1500)],
            [createVector(0, 1450), createVector(463, 1500)],
            [createVector(635, 1450), createVector(1500, 1500)],
            [createVector(1100, 1350), createVector(1500, 1500)],
            [createVector(1200, 1250), createVector(1500, 1500)],
            [createVector(1300, 1035), createVector(1500, 1500)],
            [createVector(1300, 0), createVector(1500, 864)],
            [createVector(635, 0), createVector(1500, 300)],
            [createVector(1155, 0), createVector(1500, 400)],
            [createVector(1200, 300), createVector(1500, 470)],
        ], [{name: "GremlinBug", x: 300, y: 700}]),
        "0_1": new Room(0, [{x: 665, y: 298}, {x: 675, y: 1339}, 0, 0], [
            [createVector(0, 0), createVector(500, 500)],
            [createVector(0, 400), createVector(100, 1500)],
            [createVector(0, 1400), createVector(664, 1500)],
            [createVector(835, 1400), createVector(1500, 1500)],
            [createVector(1400, 400), createVector(1500, 1500)],
            [createVector(1000, 0), createVector(1500, 500)],
            [createVector(400, 0), createVector(665, 298)],
            [createVector(835, 0), createVector(1100, 298)],
            [createVector(1105, 400), createVector(1500, 589)],
            [createVector(1225, 500), createVector(1500, 687)],
        ], [{name: "GremlinBug", x: 300, y: 700}]),
    };
}