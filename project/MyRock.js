import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
import {MyRightTriangle} from './MyRightTriangle.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyRock extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.body = new MySphere(scene,slices,stacks);
        this.initMaterials();
        //this.initBuffers();
        var rockX = Math.floor(Math.random() * (15-5) + 6);
        const rockY = this.number();
        window.alert(rockX);
    }
    
    initMaterials(){
      this.bodyMaterial = new CGFappearance(this.scene);
      this.bodyMaterial.setAmbient(0.9, 0.1, 0.1, 1);
      this.bodyMaterial.setDiffuse(0.9, 0.1, 0.1, 1);
      this.bodyMaterial.setSpecular(0.3, 0.3, 0.3, 1);
      this.bodyMaterial.setEmission(0.0, 0.0, 0.0, 1);
      //the 2 following textures are free to use and where obtained from https://3dtextures.me/2020/10/30/ground-wet-rocks-002/
      this.bodyTexture = new CGFtexture(this.scene,'images/rockTex/basecolor.jpg');
      this.bodyNormal = new CGFtexture(this.scene,'images/rockTex/normal.jpg');
      this.bodyMaterial.setTexture(this.bodyTexture);
      this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');
  
      this.bodyShader = new CGFshader(this.scene.gl, 'shaders/rockShader.vert', 'shaders/rockShader.frag');
      this.bodyShader.setUniformsValues({uSampler2: 1});
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        /*
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
        */
      }

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(slices){
        this.slices = Math.round(slices);

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    number(){
      return Math.random() * (15-5) + 6;
  }

    display(){
      this.scene.pushMatrix();
      //this.scene.translate(this.rockX,5,0); <-- try this
      this.scene.translate(12,5,0);
  
      //body
        this.scene.setActiveShader(this.bodyShader);
        this.bodyNormal.bind(1);
        this.bodyMaterial.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.2,0.2,0.2);
        this.scene.rotate(0,0,0,0);
        this.body.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
        //super.display();
    }
}