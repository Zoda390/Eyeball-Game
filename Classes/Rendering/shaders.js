var vert1 = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// lets get texcoords just for fun! 
varying vec2 vTexCoord;

void main() {
  // copy the texcoords
  vTexCoord = aTexCoord;

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
`;

var frag1 = `
#ifdef GL_ES
precision mediump float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform sampler2D pal1;
uniform sampler2D pal2;
uniform sampler2D pal3;

void main() {
  vec2 uv = vTexCoord;
  
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;
  
  vec4 tex = texture2D(tex1, uv);
  vec4 outputColor = vec4(0.0, 0.0, 0.0, 0.0);
  
  //start with a number that will always be bigger
  float closestDistance = 100.0;
  for(int x = 0; x < 48; x++){
    vec4 c = texture2D(pal1, vec2((float(x)/48.0)+((1.0/48.0)/2.0), 0.0));
    
    //check to see if this color is closer
    float distance = distance(tex, c);
    if(distance <= closestDistance){ 
        vec4 eye_1 = texture2D(pal2, vec2((float(x)/48.0)+((1.0/48.0)/2.0),0.0));
        vec4 eye2 = texture2D(pal3, vec2((float(x)/48.0)+((1.0/48.0)/2.0),0.0));
        if(eye_1.a + eye2.a > 1.0){
            outputColor = ((eye_1*eye_1.a)+(eye2*eye2.a))/2.0;
        }
        else{
            outputColor = ((eye_1*eye_1.a)+(eye2*eye2.a));
        }
        if(outputColor.a < 1.0){
            outputColor = (outputColor*outputColor.a) + (texture2D(tex0, uv)*texture2D(tex0, uv).a);
        }
        //keep track of the last closest
        closestDistance = distance;
    }
  }

  
  gl_FragColor = outputColor;

  // render the output
  
}
`;

//shader for items
var frag2 = `
#ifdef GL_ES
precision mediump float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform sampler2D pal1;
uniform sampler2D pal2;
uniform sampler2D pal3;
uniform sampler2D pal4;

void main() {
  vec2 uv = vTexCoord;
  
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;
  
  vec4 tex = texture2D(tex1, uv);
  vec4 outputColor = vec4(0.0, 0.0, 0.0, 0.0);
  
  //start with a number that will always be bigger
  float closestDistance = 100.0;
  for(int x = 0; x < 48; x++){
    vec4 c = texture2D(pal1, vec2((float(x)/48.0)+((1.0/48.0)/2.0), 0.0));
    
    //check to see if this color is closer
    float distance = distance(tex, c);
    if(distance <= closestDistance){ 
      vec4 eye_1 = texture2D(pal2, vec2((float(x)/48.0)+((1.0/48.0)/2.0),0.0));
      vec4 eye2 = texture2D(pal3, vec2((float(x)/48.0)+((1.0/48.0)/2.0),0.0));
      if(eye_1.a + eye2.a > 1.0){
        outputColor = ((eye_1*eye_1.a)+(eye2*eye2.a))/2.0;
      }
      else{
        outputColor = ((eye_1*eye_1.a)+(eye2*eye2.a));
      }
      if(outputColor.a <= 0.1){
        outputColor = texture2D(pal4, vec2((float(x)/48.0)+((1.0/48.0)/2.0),0.0));
      }
      if(outputColor.a < 1.0){
        outputColor = (outputColor*outputColor.a) + (texture2D(tex0, uv)*texture2D(tex0, uv).a);
      }
      //keep track of the last closest
      closestDistance = distance;
    }
  }

  
  gl_FragColor = outputColor;

  // render the output
  
}
`;

var layerdb; //debug layer
var layerbg; //black background for blind
var layer0; //room layer
var layer1; //room + shader layer
var layer2; //entities layer
var layer3; //entities + shader layer
var layer4; //ui + item layer
var layer5; //ui + item + shader layer
//layer6 = createCanvas(); all layers combined

var colorShader1;
var colorShader3;
var colorShader5;

var gamePalette;
var palette2;

function setupGraphics(){
    layerdb = createGraphics(width, height);
    layerbg = createGraphics(width, height);
    layer0 = createGraphics(width, height);
    layer1 = createGraphics(width, height, WEBGL);
    layer2 = createGraphics(width, height);
    layer3 = createGraphics(width, height, WEBGL);
    layer4 = createGraphics(width, height);
    layer5 = createGraphics(width, height, WEBGL);

    layer0.noStroke();
    layer1.noStroke();
    layer2.noStroke();
    layer3.noStroke();
    layer4.noStroke();
    layer4.noStroke();
    layer5.noStroke();

    colorShader1 = layer1.createShader(vert1, frag1);
    layer1.shader(colorShader1);
    colorShader3 = layer3.createShader(vert1, frag1);
    layer3.shader(colorShader3);
    colorShader5 = layer5.createShader(vert1, frag2);
    layer5.shader(colorShader5);
}

function layer7Draw(){
    layerbg.background(10);

    let pal2 = emptyPalette;
    let pal3 = emptyPalette;
    if(player[0].eyes[0] != 0){
      pal2 = itemImgs[player[0].eyes[0].pngNum][1];
    }
    if(player[0].eyes[1] != 0){
      pal3 = itemImgs[player[0].eyes[1].pngNum][1];
    }

    layer1.rect(-width/2, -height/2, width, height);
    colorShader1.setUniform("tex0", layerbg);
    colorShader1.setUniform("tex1", layer0);
    colorShader1.setUniform("pal1", gamePalette);
    colorShader1.setUniform("pal2", pal2);
    colorShader1.setUniform("pal3", pal3);

    layer3.rect(-width/2, -height/2, width, height);
    colorShader3.setUniform("tex0", layer1);
    colorShader3.setUniform("tex1", layer2);
    colorShader3.setUniform("pal1", gamePalette);
    colorShader3.setUniform("pal2", pal2);
    colorShader3.setUniform("pal3", pal3);
    layer2.clear();

    layer5.rect(-width/2, -height/2, width, height);
    
    drawUI();

    colorShader5.setUniform("tex0", layer3);
    colorShader5.setUniform("tex1", layer4);
    colorShader5.setUniform("pal1", gamePalette);
    colorShader5.setUniform("pal2", pal2);
    colorShader5.setUniform("pal3", pal3);
    colorShader5.setUniform("pal4", greyGamePalette);
    
    //background(0);
    image(layer5, 0, 0);
    image(layerdb, 0, 0);
    layerdb.clear();
}

function drawUI(){
  //draw UI
  layer4.clear();
  layer4.fill(100);
  layer4.image(uiImgs[2], 0, 0);
  layer4.image(uiImgs[0].get(0, 0, floor((player[0].hp/player[0].mhp)*195)+95, 105), 0, 0);
  layer4.image(uiImgs[1].get(0, 0, floor((min(Date.now()-player[0].weapon.lastShot, player[0].weapon.cooldown)/player[0].weapon.cooldown)*260)+45, 105), 0, 0);
  uim.render();
}

class UImanager{
  constructor(){
    this.showInv = false;
    this.showOpts = false;
    this.showCorpseInv = false;
    this.corpseSlots = [];
    this.cursorPos = {
      "eye_0": {pos: createVector(44, 99), point: ["inv_0","inv_0","inv_5","eye_1"]},
      "eye_1": {pos: createVector((88*2)+44, 99), point: ["inv_2","inv_2","eye_0","inv_3"]},
      "inv_0": {pos: createVector(44, 275), point: ["eye_0","eye_0","inv_11","inv_1"]},
      "inv_1": {pos: createVector(88+44, 275), point: ["eye_0","eye_1","inv_0","inv_2"]},
      "inv_2": {pos: createVector((88*2)+44, 275), point: ["eye_1","eye_1","inv_1","inv_9"]},
      "inv_3": {pos: createVector((88*3)+44+10, 99), point: ["inv_9","inv_6","inv_1","inv_4"]},
      "inv_4": {pos: createVector((88*4)+44+10, 99), point: ["inv_10","inv_7","inv_1","inv_5"]},
      "inv_5": {pos: createVector((88*5)+44+10, 99), point: ["inv_11","inv_8","inv_1","eye_0"]},
      "inv_6": {pos: createVector((88*3)+44+10, 99+88), point: ["inv_3","inv_9","inv_1","inv_7"]},
      "inv_7": {pos: createVector((88*4)+44+10, 99+88), point: ["inv_4","inv_10","inv_6","inv_8"]},
      "inv_8": {pos: createVector((88*5)+44+10, 99+88), point: ["inv_5","inv_11","inv_7","inv_6"]},
      "inv_9": {pos: createVector((88*3)+44+10, 275), point: ["inv_6","inv_3","inv_2","inv_10"]},
      "inv_10": {pos: createVector((88*4)+44+10, 275), point: ["inv_7","inv_4","inv_9","inv_11"]},
      "inv_11": {pos: createVector((88*5)+44+10, 275), point: ["inv_8","inv_5","inv_10","inv_0"]},

      "opts_0": {pos: createVector((width/2), (height/3)), point: ["opts_1","opts_1","opts_0","opts_0"]},
      "opts_1": {pos: createVector((width/2), (height/3)), point: ["opts_0","opts_0","opts_1","opts_1"]},
    };
    this.cursor1 = "eye_1";
    this.cursor2 = "inv_1";
    this.cursor3 = "opts_0";
  }

  render(){
    layer4.push();
    //layer4.imageMode(CENTER);
    if(this.showInv){
      layer4.image(uiImgs[4], (width/2)-(538/2), (height/3)-(322/2));
      layer4.image(uiImgs[5], (width/2)-(538/2)+this.cursorPos[this.cursor1].pos.x-44, (height/3)-(322/2)+this.cursorPos[this.cursor1].pos.y-44);
      layer4.image(uiImgs[6], (width/2)-(538/2)+this.cursorPos[this.cursor2].pos.x-44, (height/3)-(322/2)+this.cursorPos[this.cursor2].pos.y-44);
      for(let i = 0; i < player[0].eyes.length; i++){
        if(player[0].eyes[i] != 0){
          player[0].eyes[i].render((width/2)-(538/2)+this.cursorPos["eye_"+i].pos.x-32, (height/3)-(322/2)+this.cursorPos["eye_"+i].pos.y-32);
        }
      }
      for(let i = 0; i < player[0].inv.length; i++){
        if(player[0].inv[i] != 0){
          player[0].inv[i].render((width/2)-(538/2)+this.cursorPos["inv_"+i].pos.x-32, (height/3)-(322/2)+this.cursorPos["inv_"+i].pos.y-32);
        }
      }
    }
    if(this.showOpts){
      layer4.image(uiImgs[7], width/2, height/3);
      layer4.image(uiImgs[8], this.cursorPos[this.cursor3].pos.x, this.cursorPos[this.cursor3].pos.y);
    }
    if(this.showCorpseInv){
      
    }
    layer4.pop();
  }

  corpseInfo(corpse){
    console.log(corpse);
  }

  takeInput(keyCode){
    if(keyCode == 87){
      this.cursor1 = this.cursorPos[this.cursor1].point[0];
    }
    else if(keyCode == 83){
      this.cursor1 = this.cursorPos[this.cursor1].point[1];
    }
    else if(keyCode == 65){
      this.cursor1 = this.cursorPos[this.cursor1].point[2];
    }
    else if(keyCode == 68){
      this.cursor1 = this.cursorPos[this.cursor1].point[3];
    }
    else if(keyCode == UP_ARROW){
      this.cursor2 = this.cursorPos[this.cursor2].point[0];
    }
    else if(keyCode == DOWN_ARROW){
      this.cursor2 = this.cursorPos[this.cursor2].point[1];
    }
    else if(keyCode == LEFT_ARROW){
      this.cursor2 = this.cursorPos[this.cursor2].point[2];
    }
    else if(keyCode == RIGHT_ARROW){
      this.cursor2 = this.cursorPos[this.cursor2].point[3];
    }
    else if(keyCode == 69){

    }
    else if(keyCode == 70){
      //swap items
      let temp1 = this.cursor1.split("_");
      let temp2 = this.cursor2.split("_");
      temp1[1] = parseInt(temp1[1]);
      temp2[1] = parseInt(temp2[1]);
      if(temp1[0] == "inv"){
        if(temp2[0] == "inv"){
          //soundPwang.play(1);
          let tempI = player[0].inv[temp2[1]];
          player[0].inv[temp2[1]] = player[0].inv[temp1[1]];
          player[0].inv[temp1[1]] = tempI;
        }
        else if(temp2[0] == "eye" && (player[0].inv[temp1[1]].pngNum < 8 || player[0].inv[temp1[1]] == 0)){
          //soundEyeIn.play(1);
          let tempI = player[0].eyes[temp2[1]];
          player[0].eyes[temp2[1]] = player[0].inv[temp1[1]];
          player[0].inv[temp1[1]] = tempI;
        }
      }
      else if(temp1[0] == "eye"){
        if(temp2[0] == "inv" && (player[0].inv[temp2[1]].pngNum < 8 || player[0].inv[temp2[1]] == 0)){
          //soundEyeIn.play(1);
          let tempI = player[0].inv[temp2[1]];
          player[0].inv[temp2[1]] = player[0].eyes[temp1[1]];
          player[0].eyes[temp1[1]] = tempI;
        }
        else if(temp2[0] == "eye" && (player[0].eyes[temp1[1]].pngNum < 8 || player[0].eyes[temp1[1]] == 0)  && (player[0].eyes[temp2[1]].pngNum < 8 || player[0].eyes[temp2[1]] == 0)){
          //soundEyeIn.play(1);
          let tempI = player[0].eyes[temp2[1]];
          player[0].eyes[temp2[1]] = player[0].eyes[temp1[1]];
          player[0].eyes[temp1[1]] = tempI;
        }
      }
      

    }
    else{
      console.log("inv input not understood");
    }
  }
}