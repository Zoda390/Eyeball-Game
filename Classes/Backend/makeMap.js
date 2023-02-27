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
var CurrentRoomId = "0_0";
var edgePadding = 300;
var bottomWallOffset = 45;


function makeMap(){
    rooms = {
        "0_0": new Room(0, [0, {x: 405, y: 863}, 0, {x: 872, y: 560}], [
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(900 + edgePadding, 176)],
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(59, 900 + edgePadding)],
            [createVector(0 - edgePadding, 840+bottomWallOffset), createVector(398, 900 + edgePadding)],
            [createVector(501, 840+bottomWallOffset), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(840, 0 - edgePadding), createVector(900 + edgePadding, 458)],
            [createVector(840, 561), createVector(900 + edgePadding, 900 + edgePadding)],
        ], [{name: "GremlinBug", x: 180, y: 420}]),

        "0_1": new Room(1, [{x: 279, y: 179}, 0, 0, {x: 812, y: 620}], [
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(278, 179)],
            [createVector(381, 0 - edgePadding), createVector(900 + edgePadding, 179)],
            [createVector(666, 0 - edgePadding), createVector(900 + edgePadding, 245)],
            [createVector(720, 0 - edgePadding), createVector(900 + edgePadding, 287)],
            [createVector(780, 0 - edgePadding), createVector(900 + edgePadding, 518)],
            [createVector(780, 621), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(720, 720+bottomWallOffset), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(660, 780+bottomWallOffset), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(0 - edgePadding, 840+bottomWallOffset), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(179, 239)],
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(119, 299)],
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(59, 900 + edgePadding)],
            [createVector(0 - edgePadding, 720+bottomWallOffset), createVector(119, 900 + edgePadding)],
            [createVector(0 - edgePadding, 780+bottomWallOffset), createVector(179, 900 + edgePadding)],
        ], [{name: "eyeFloater", x: 120, y: 280}]),

        "1_0": new Room(2, [0, {x: 525, y: 863}, {x: 27, y: 621}, 0], [
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(900 + edgePadding, 176)],
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(233, 245)],
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(179, 287)],
            [createVector(720, 0 - edgePadding), createVector(900 + edgePadding, 239)],
            [createVector(780, 0 - edgePadding), createVector(900 + edgePadding, 299)],
            [createVector(840, 0 - edgePadding), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(783, 720+bottomWallOffset), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(720, 780+bottomWallOffset), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(621, 840+bottomWallOffset), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(0 - edgePadding, 840+bottomWallOffset), createVector(518, 900 + edgePadding)],
            [createVector(0 - edgePadding, 720+bottomWallOffset), createVector(179, 900 + edgePadding)],
            [createVector(0 - edgePadding, 780+bottomWallOffset), createVector(239, 900 + edgePadding)],
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(119, 518)],
            [createVector(0 - edgePadding, 621), createVector(119, 900 + edgePadding)],
        ], [{name: "eyeFloater", x: 120, y: 280}]),

        "1_1": new Room(3, [{x: 399, y: 178}, 0, {x: 27, y: 560}, 0], [
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(300, 300)],
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(60, 460)],
            [createVector(0 - edgePadding, 560), createVector(60, 900 + edgePadding)],
            [createVector(0 - edgePadding, 780+bottomWallOffset), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(840, 240), createVector(900 + edgePadding, 900 + edgePadding)],
            [createVector(600, 0 - edgePadding), createVector(900 + edgePadding, 300)],
            [createVector(0 - edgePadding, 0 - edgePadding), createVector(399, 178)],
            [createVector(501, 0 - edgePadding), createVector(860, 178)],
            [createVector(663, 0 - edgePadding), createVector(900, 354)],
            [createVector(735, 0 - edgePadding), createVector(900, 412)],
        ], [{name: "eyeFloater", x: 120, y: 280}]),
    };
}