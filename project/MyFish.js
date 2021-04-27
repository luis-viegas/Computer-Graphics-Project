import {CGFobject} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
import {MyRightTriangle} from './MyRightTriangle.js';

export class MyFish extends CGFobject {
  /**
   * @method constructor
   */
  constructor(scene, slices, stacks) {
    super(scene);
    this.body = new MySphere(scene,16,8);
    this.eye = new MySphere(scene,16,8);
    this.fin = new MyRightTriangle(scene);
    //this.texture = texture;

    this.initBuffers();
  }

  display(){
    this.scene.pushMatrix();
    this.scene.translate(0,3,0);

    //body
      this.scene.pushMatrix();
      this.scene.scale(0.2,0.35,0.5);
      this.body.display();
      this.scene.popMatrix();

    //eyes
      //left
      this.scene.pushMatrix();
      this.scene.translate(0.1,0.1,0.2);
      this.scene.scale(0.1,0.1,0.1);
      this.eye.display();
      this.scene.popMatrix();
      //right
      this.scene.pushMatrix();
      this.scene.translate(-0.1,0.1,0.2);
      this.scene.scale(0.1,0.1,0.1);
      this.eye.display();
      this.scene.popMatrix();

    //fins
      //top fin
      this.scene.pushMatrix();
      this.scene.translate(0,0.3,0.2);
      this.scene.scale(0.5,0.5,0.5);
      this.scene.rotate(-Math.PI/2,0,1,0);
      this.fin.display();
      this.scene.popMatrix();
      //tail fin
      this.scene.pushMatrix();
      this.scene.translate(0,0,-0.85);
      this.scene.scale(0.5,0.5,0.5);
      this.scene.rotate(Math.PI/2,0,1,0);
      this.scene.rotate(-Math.PI/4,0,0,1);
      this.fin.display();
      this.scene.popMatrix();
      //left fin
      this.scene.pushMatrix();
      this.scene.translate(0.2,-0.2,0);
      this.scene.scale(0.25,0.25,0.25);
      this.scene.rotate(Math.PI/8,0,0,1);
      this.scene.rotate(Math.PI/2,0,1,0);
      this.fin.display();
      this.scene.popMatrix();
      //right fin
      this.scene.pushMatrix();
      this.scene.translate(-0.2,-0.2,0);
      this.scene.scale(0.25,0.25,0.25);
      this.scene.rotate(-Math.PI/8,0,0,1);
      this.scene.rotate(Math.PI/2,0,1,0);
      this.fin.display();
      this.scene.popMatrix();
    this.scene.popMatrix();
  }
}
