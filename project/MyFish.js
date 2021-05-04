import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
import {MyRightTriangle} from './MyRightTriangle.js';

export class MyFish extends CGFobject {
  /**
   * @method constructor
   */
  constructor(scene, slices, stacks) {
    super(scene);
    this.body = new MySphere(scene,32,16);
    this.eye = new MySphere(scene,16,8);
    this.fin = new MyRightTriangle(scene);
    
    this.tailOffset = 0.0;
    this.sideFinOffset = 0.0;
    
    this.bodyMaterial = new CGFappearance(this.scene);
    this.bodyMaterial.setAmbient(0.9, 0.1, 0.1, 1);
    this.bodyMaterial.setDiffuse(0.9, 0.1, 0.1, 1);
    this.bodyMaterial.setSpecular(0.3, 0.3, 0.3, 1);
    this.bodyMaterial.setEmission(0.0, 0.0, 0.0, 1);
    //the 2 following textures are free to use and where obtained from https://3dtextures.me/2019/07/24/dragon-scales-001/
    this.bodyTexture = new CGFtexture(this.scene,'images/fish_textures/Dragon_Scales_001_basecolor.jpg');
    this.bodyNormal = new CGFtexture(this.scene,'images/fish_textures/Dragon_Scales_001_normal.jpg');
    this.bodyMaterial.setTexture(this.bodyTexture);
    this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');

    this.bodyShader = new CGFshader(this.scene.gl, 'shaders/fish_body.vert', 'shaders/fish_body.frag');
    this.bodyShader.setUniformsValues({uSampler2: 1});

    this.eyeMaterial = new CGFappearance(this.scene);
    this.eyeMaterial.setAmbient(1.0, 1.0, 1.0, 1);
    this.eyeMaterial.setDiffuse(1.0, 1.0, 1.0, 1);
    this.eyeMaterial.setSpecular(0.3, 0.3, 0.3, 1);
    this.eyeMaterial.setEmission(0.0, 0.0, 0.0, 1);
    this.eyeMaterial.loadTexture('images/fish_textures/fish_eye.png');
    this.eyeMaterial.setTextureWrap('REPEAT', 'REPEAT');
  
    this.finMaterial = new CGFappearance(this.scene);
    this.finMaterial.setAmbient(0.9, 0.1, 0.1, 1);
    this.finMaterial.setDiffuse(0.9, 0.1, 0.1, 1);
    this.finMaterial.setSpecular(0.3, 0.3, 0.3, 1);
    this.finMaterial.setEmission(0.0, 0.0, 0.0, 1);
    // this.finMaterial.loadTexture('images/tangram.png');
    this.finMaterial.setTextureWrap('REPEAT', 'REPEAT');
  }

  update(t){
    this.tailOffset = Math.cos(t/100)*(Math.PI/9);
    this.sideFinOffset = Math.cos(t/200)*(Math.PI/8);
  }

  display(){
    this.scene.pushMatrix();
    this.scene.translate(0,3,0);

    //body
      this.scene.setActiveShader(this.bodyShader);
      this.bodyNormal.bind(1);
      this.bodyMaterial.apply();
      this.scene.pushMatrix();
      this.scene.scale(0.2,0.35,0.5);
      this.scene.rotate(Math.PI/2,1,0,0);
      this.body.display();
      this.scene.popMatrix();
  		this.scene.setActiveShader(this.scene.defaultShader);

    //eyes
    this.eyeMaterial.apply();
      //left
      this.scene.pushMatrix();
      this.scene.translate(0.1,0.1,0.25);
      this.scene.scale(0.1,0.1,0.1);
      this.scene.rotate(Math.PI*7/8,0,1,0);
      this.eye.display();
      this.scene.popMatrix();
      //right
      this.scene.pushMatrix();
      this.scene.translate(-0.1,0.1,0.25);
      this.scene.scale(0.1,0.1,0.1);
      this.scene.rotate(Math.PI/8,0,1,0);
      this.eye.display();
      this.scene.popMatrix();

    //fins
    this.finMaterial.apply();
      //top fin
      this.scene.pushMatrix();
      this.scene.translate(0,0.3,0.15);
      this.scene.scale(0.5,0.5,0.5);
      this.scene.rotate(-Math.PI/2,0,1,0);
      this.fin.display();
      this.scene.popMatrix();
      //tail fin
      this.scene.pushMatrix();
      this.scene.translate(0,0,-0.4);
      this.scene.scale(0.5,0.5,0.5);
      this.scene.rotate(this.tailOffset,0,1,0);
      this.scene.translate(0,0,-0.7);
      this.scene.rotate(Math.PI/2,0,1,0);
      this.scene.rotate(-Math.PI/4,0,0,1);
      this.fin.display();
      this.scene.popMatrix();
      //left fin
      this.scene.pushMatrix();
      this.scene.translate(0.2,-0.2,0);
      this.scene.scale(0.25,0.25,0.25);
      this.scene.translate(-0.2,0.5,0);
      this.scene.rotate(this.sideFinOffset,0,0,1);
      this.scene.translate(0.2,-0.5,0);
      this.scene.rotate(Math.PI/8,0,0,1);
      this.scene.rotate(Math.PI/2,0,1,0);
      this.fin.display();
      this.scene.popMatrix();
      //right fin
      this.scene.pushMatrix();
      this.scene.translate(-0.2,-0.2,0);
      this.scene.scale(0.25,0.25,0.25);
      this.scene.translate(0.2,0.5,0);
      this.scene.rotate(-this.sideFinOffset,0,0,1);
      this.scene.translate(-0.2,-0.5,0);
      this.scene.rotate(-Math.PI/8,0,0,1);
      this.scene.rotate(Math.PI/2,0,1,0);
      this.fin.display();
      this.scene.popMatrix();
    this.scene.popMatrix();
  }
}
