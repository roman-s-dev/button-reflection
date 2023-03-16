let cam;
let myShader;
let lut;
let perlin;
let tiles;

function preload() {
  // load the shader
  myShader = loadShader("cam_shader.vert", "cam_shader.frag");

  // map = loadImage("./map.png");
  normalTex = loadImage("./normal.png");
  reflectionTex = loadImage("./reflection.png");
  // test_tex = loadImage("./tex.png");
  fresnelTex = loadImage("./fresnel.png");
  diffuseTex = loadImage("./diffuse.png");
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(500, 100, WEBGL);
  noStroke();

  cam = createCapture(VIDEO);
  cam.size(500, 100);
  cam.hide();
}

function draw() {
  shader(myShader);
  myShader.setUniform("cam_tx", cam);
  myShader.setUniform("normal_tx", normalTex);
  myShader.setUniform("reflection_tx", reflectionTex);
  myShader.setUniform("fresnel_tx", fresnelTex);
  myShader.setUniform("diffuse_tx", diffuseTex);
  // myShader.setUniform("time", frameCount * 0.01666); // 1.0/60.0
  rect(0, 0, width, height);
}
