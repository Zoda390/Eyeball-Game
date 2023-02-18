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

void main() {
  vec2 uv = vTexCoord;
  
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;
  
  vec4 tex = texture2D(tex1, uv);
  vec4 outputColor = vec4(0.0, 0.0, 0.0, 0.0);

  for(int x = 0; x < 48; x++){
    vec4 c = texture2D(pal1, vec2((float(x)/48.0)+((1.0/48.0)/2.0), 0.0));
    if(distance(tex, c) <= 0.16){
        outputColor = texture2D(pal2, vec2((float(x)/48.0)+((1.0/48.0)/2.0),0.0));
        if(outputColor.a < 1.0){
            outputColor = (outputColor*outputColor.a) + (texture2D(tex0, uv)*texture2D(tex0, uv).a);
        }
        break;
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

void main() {
  vec2 uv = vTexCoord;
  
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;
  
  vec4 tex = texture2D(tex1, uv);
  vec4 outputColor = vec4(0.0, 0.0, 0.0, 0.0);

  for(int x = 0; x < 48; x++){
    vec4 c = texture2D(pal1, vec2((float(x)/48.0)+((1.0/48.0)/2.0), 0.0));
    if(distance(tex, c) <= 0.16){
        outputColor = texture2D(pal2, vec2((float(x)/48.0)+((1.0/48.0)/2.0),0.0));
        if(outputColor.a < 1.0){
            outputColor = (outputColor*outputColor.a) + (texture2D(tex0, uv)*texture2D(tex0, uv).a);
        }
        break;
    }
  }

  
  gl_FragColor = outputColor;

  // render the output
  
}
`;

var layer0; //room layer
var layer1; //room + shader layer
var layer2; //entities layer
var layer3; //entities + shader layer
var layer4; //ui layer
var layer5; //item layer
var layer6; //item + shader layer
//layer7 = createCanvas(); all layers combined

var colorShader1;
var colorShader3;
var colorShader6;

var gamePalette;
var palette2;

function setupGraphics(){
    layer0 = createGraphics(width, height);
    layer1 = createGraphics(width, height, WEBGL);
    layer2 = createGraphics(width, height);
    layer3 = createGraphics(width, height, WEBGL);
    layer4 = createGraphics(width, height);
    layer5 = createGraphics(width, height);
    layer6 = createGraphics(width, height, WEBGL);

    colorShader1 = layer1.createShader(vert1, frag1);
    layer1.shader(colorShader1);
    colorShader3 = layer3.createShader(vert1, frag1);
    layer3.shader(colorShader3);
    colorShader6 = layer6.createShader(vert1, frag2);
    layer6.shader(colorShader6);
}

function layer7Draw(){
    layer1.rect(-width/2, -height/2, width, height);
    colorShader1.setUniform("tex0", layer0);
    colorShader1.setUniform("tex1", layer0);
    colorShader1.setUniform("pal1", gamePalette);
    colorShader1.setUniform("pal2", palette2);

    layer3.rect(-width/2, -height/2, width, height);
    colorShader3.setUniform("tex0", layer1);
    colorShader3.setUniform("tex1", layer2);
    colorShader3.setUniform("pal1", gamePalette);
    colorShader3.setUniform("pal2", palette2);
    layer2.clear();

    layer6.rect(-width/2, -height/2, width, height);
    colorShader6.setUniform("tex0", layer3);
    colorShader6.setUniform("tex1", layer5);
    colorShader6.setUniform("pal1", gamePalette);
    colorShader6.setUniform("pal2", palette2);

    //background(0);
    image(layer6, 0, 0);
}