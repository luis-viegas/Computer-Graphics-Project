import {CGFobject} from '../lib/CGF.js';
import {MyQuad} from "./MyQuad.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.quad0 = new MyQuad(scene);
		this.quad1 = new MyQuad(scene);
		this.quad2 = new MyQuad(scene);
		this.quad3 = new MyQuad(scene);
		this.quad4 = new MyQuad(scene);
		this.quad5 = new MyQuad(scene);
	}
	
	display(scene){
		scene.pushMatrix();
		scene.translate(0,0,-0.5);
		scene.rotate(Math.PI,1,0,0);
		this.quad0.display();
		scene.popMatrix();

		scene.pushMatrix();
		scene.translate(0,0,0.5);
		this.quad1.display();
		scene.popMatrix();

		scene.pushMatrix();
		scene.translate(0.5,0,0);
		scene.rotate(Math.PI/2,0,1,0);
		this.quad2.display();
		scene.popMatrix();

		scene.pushMatrix();
		scene.translate(-0.5,0,0);
		scene.rotate(-Math.PI/2,0,1,0);
		this.quad3.display();
		scene.popMatrix();

		scene.pushMatrix();
		scene.translate(0,-0.5,0);
		scene.rotate(Math.PI/2,1,0,0);
		this.quad4.display();
		scene.popMatrix();

		scene.pushMatrix();
		scene.translate(0,0.5,0);
		scene.rotate(-Math.PI/2,1,0,0);
		this.quad5.display();
		scene.popMatrix();
	}
}

