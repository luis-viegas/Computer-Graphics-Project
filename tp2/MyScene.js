import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTangram } from "./MyTangram.js";
import {MyUnitCube} from "./MyUnitCube.js";
import {MyUnitCubeQuad} from "./MyUnitCubeQuad.js";


/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    this.triangleS = new MyTriangleSmall(this);
    this.triangleB = new MyTriangleBig(this);
    this.tangram = new MyTangram(this);
    this.cube = new MyUnitCube(this);
    this.cubeQuad = new MyUnitCubeQuad(this);


    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.diamondVisable = false;
    this.triangleVisable = false;
    this.parallelogramVisable = false;
    this.triangleSVisable = false;
    this.triangleBVisable = false;
    this.tangramVisible = false;
    this.cubeVisible = false;
    this.parallelXZ = false;
    this.cubeQuadVisible = true;

  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    var diamTransl = [1,0,0,0,
                      0,1,0,0,
                      0,0,1,0,
                      2,2,0,1];
    

    this.multMatrix(sca);
    this.pushMatrix();
    if(this.parallelXZ){
      this.translate(0.5,0,0.5);
      this.rotate(-Math.PI/2,1,0,0);
    } 
    this.pushMatrix();
    this.translate(0,1.5,0);

    if(this.tangramVisible) this.tangram.display(this);
    // ---- BEGIN Primitive drawing section
  
    this.pushMatrix();
    this.multMatrix(diamTransl);
    if(this.diamondVisable) this.diamond.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(0.5,-0.5,0);
    this.scale(2,2,2);
    this.rotate(Math.PI/2,0,0,1);
    if(this.triangleVisable) this.triangle.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-1,-2,0);
    this.scale(2,2,2);
    this.rotate(-Math.PI/2,0,0,1);
    if(this.triangleVisable) this.triangle.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(1.5,-3.5,0);
    this.rotate(Math.PI,0,0,1);
    if(this.triangleVisable) this.triangle.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-3,-0.5,0);
    this.rotate(3*Math.PI/7,0,0,1);
    this.scale(-1,1,1);
    if(this.parallelogramVisable) this.parallelogram.display();
    this.popMatrix();
    
    this.pushMatrix();
    this.translate(3,3,0);
    this.rotate(Math.PI,0,0,1);
    if(this.triangleSVisable) this.triangleS.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-2,-4,0);
    this.rotate(Math.PI/2,0,0,1);
    if(this.triangleSVisable) this.triangleS.display();
    this.popMatrix();

    this.popMatrix();
    this.pushMatrix();
    this.translate(0,0,3)
    this.rotate(-Math.PI/2,1,0,0);
    if(this.triangleBVisable) this.triangleB.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(0,0,-0.5);
    if(this.cubeVisible) this.cube.display();
    if(this.cubeQuadVisible) this.cubeQuad.display(this);
    this.popMatrix();


    this.popMatrix();
    // ---- END Primitive drawing section
  }
}
