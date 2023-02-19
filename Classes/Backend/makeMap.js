// ║ ═ ╝ ╚ ╗ ╔ ╩ ╦ ╣ ╠ ╬
// 0_0 is the top left, down and right are +

/* Want
 ╔═══╗
 ╠╦╦═╬╦╗
 ║╚╣╔╝║║
╔╝ ╠╝╔╩╣
╚══╝ ╚═╝
*/
/* Will
 ╔═══╗
 ╠═╦═╣
 ║ ║╔╝
╔╝ ╠╝
╚══╝
*/
/* Defined
 ╔═══╗    
 ╠═    
 ║      
 ╝      

*/
/* Done
        
 ╠      
 ║      
 ╝      
        
*/


var rooms = {};
var CurrentRoomId = "1_2";
var edgePadding = 300;


function makeMap(){
    
    var doorsLeftToRight = [0, {x: 285, y: 864}, {x: 27, y: 561}, 0];
    
    var wallsleftToRight = [
        [createVector(0 - edgePadding, 0 - edgePadding), createVector(118, 299)],
        [createVector(0 - edgePadding, 0 - edgePadding), createVector(180, 239)],
        [createVector(0 - edgePadding, 0 - edgePadding), createVector(279, 180)],
        [createVector(0 - edgePadding, 0 - edgePadding), createVector(60, 900 + edgePadding)],
        [createVector(0 - edgePadding, 750), createVector(118, 900 + edgePadding)],
        [createVector(0 - edgePadding, 810), createVector(178, 900 + edgePadding)],
        [createVector(0 - edgePadding, 870), createVector(277, 900 + edgePadding)],
        [createVector(381, 870), createVector(900 + edgePadding, 900 + edgePadding)],
        [createVector(660, 810), createVector(900 + edgePadding, 900 + edgePadding)],
        [createVector(720, 750), createVector(900 + edgePadding, 900 + edgePadding)],
        [createVector(780, 621), createVector(900 + edgePadding, 900 + edgePadding)],
        [createVector(780, 0 - edgePadding), createVector(900 + edgePadding * 2, 519)],
        [createVector(381, 0 - edgePadding), createVector(900 + edgePadding, 180)],
        [createVector(693, 0 - edgePadding), createVector(900 + edgePadding, 240)],
        [createVector(720, 0 - edgePadding), createVector(900 + edgePadding, 282)],
    ];

    var wallsUpToDown = [
        [createVector(0 - edgePadding, 0 - edgePadding), createVector(300, 300)],
        [createVector(0 - edgePadding, 0 - edgePadding), createVector(60, 900 + edgePadding)],
        [createVector(0 - edgePadding, 840), createVector(399, 900 + edgePadding)],
        [createVector(501, 840), createVector(900 + edgePadding, 900 + edgePadding)],
        [createVector(840, 240), createVector(900 + edgePadding, 900 + edgePadding)],
        [createVector(600, 0 - edgePadding), createVector(900 + edgePadding, 300)],
        [createVector(0 - edgePadding, 0 - edgePadding), createVector(399, 178)],
        [createVector(501, 0 - edgePadding), createVector(660, 178)],
        [createVector(663, 0 - edgePadding), createVector(900, 354)],
        [createVector(735, 0 - edgePadding), createVector(900, 412)],
    ];

    var doorsUpDown = [{x: 399, y: 178}, {x: 405, y: 804}, 0, 0];

    rooms = {
        "1_2": new Room(0, doorsUpDown, wallsUpToDown, [{name: "GremlinBug", x: 180, y: 420}]),

        //{x: 279, y: 180} // {x: 813, y: 621}
        "1_1": new Room(1, [0, {x: 285, y: 864}, 0, 0], [
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(118, 299)],
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(180, 239)],
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(279, 180)],
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(60, 900 + edgePadding)],
            [createVector(0 - edgePadding, 750), createVector(118, 900 + edgePadding)],
            [createVector(0 - edgePadding, 810), createVector(178, 900 + edgePadding)],
            [createVector(0 - edgePadding, 870), createVector(277, 900 + edgePadding)],
            [createVector(381, 870), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(660, 810), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(720, 750), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(780, 621), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(780, 0 - edgePadding), createVector(900 + edgePadding * 2, 519)],
            [createVector(381, 0 - edgePadding), createVector(900 + edgePadding, 180)],
            [createVector(693, 0 - edgePadding), createVector(900 + edgePadding, 240)],
            [createVector(720, 0 - edgePadding), createVector(900 + edgePadding, 282)],
        ], [{name: "eyeFloater", x: 120, y: 280}]),

        //{x: 27, y: 561}
        "1_3": new Room(2, [{x: 519, y: 178}, 0, 0, 0], [
        ], [{name: "tallBug", x: 300, y: 480}]),

        "1_0": new Room(1, [0, {x: 285, y: 864}, 0, {x: 813, y: 621}], [
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(118, 299)],
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(180, 239)],
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(279, 180)],
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(60, 900 + edgePadding)],
            [createVector(0 - edgePadding, 750), createVector(118, 900 + edgePadding)],
            [createVector(0 - edgePadding, 810), createVector(178, 900 + edgePadding)],
            [createVector(0 - edgePadding, 870), createVector(277, 900 + edgePadding)],
            [createVector(381, 870), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(660, 810), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(720, 750), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(780, 621), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(780, 0 - edgePadding), createVector(900 + edgePadding * 2, 519)],
            [createVector(381, 0 - edgePadding), createVector(900 + edgePadding, 180)],
            [createVector(693, 0 - edgePadding), createVector(900 + edgePadding, 240)],
            [createVector(720, 0 - edgePadding), createVector(900 + edgePadding, 282)],
        ], [{name: "eyeFloater", x: 120, y: 280}]),

        // "2_0": new Room(1, doorsLeftToRight, wallsleftToRight, [{name: "eyeFloater", x: 120, y: 280}]),

        // "3_0": new Room(1, doorsLeftToRight, wallsleftToRight, [{name: "eyeFloater", x: 120, y: 280}]),

        // "4_0": new Room(1, doorsLeftToRight, wallsleftToRight, [{name: "eyeFloater", x: 120, y: 280}]),

        // "5_0": new Room(1, [0, {x: 285, y: 864}, {x: 27, y: 561}, 0], [
        //     [createVector(0 - edgePadding, 0 - edgePadding), createVector(118, 299)],
        //     [createVector(0 - edgePadding, 0 - edgePadding), createVector(180, 239)],
        //     [createVector(0 - edgePadding, 0 - edgePadding), createVector(279, 180)],
        //     [createVector(0 - edgePadding, 0 - edgePadding), createVector(60, 900 + edgePadding)],
        //     [createVector(0 - edgePadding, 750), createVector(118, 900 + edgePadding)],
        //     [createVector(0 - edgePadding, 810), createVector(178, 900 + edgePadding)],
        //     [createVector(0 - edgePadding, 870), createVector(277, 900 + edgePadding)],
        //     [createVector(381, 870), createVector(900 + edgePadding, 900 + edgePadding)],
        //     [createVector(660, 810), createVector(900 + edgePadding, 900 + edgePadding)],
        //     [createVector(720, 750), createVector(900 + edgePadding, 900 + edgePadding)],
        //     [createVector(780, 621), createVector(900 + edgePadding, 900 + edgePadding)],
        //     [createVector(780, 0 - edgePadding), createVector(900 + edgePadding * 2, 519)],
        //     [createVector(381, 0 - edgePadding), createVector(900 + edgePadding, 180)],
        //     [createVector(693, 0 - edgePadding), createVector(900 + edgePadding, 240)],
        //     [createVector(720, 0 - edgePadding), createVector(900 + edgePadding, 282)],
        // ], [{name: "eyeFloater", x: 120, y: 280}]),

        // "2_1": new Room(1, doorsLeftToRight, wallsleftToRight, [{name: "tallBug", x: 120, y: 280}]),
    };
}