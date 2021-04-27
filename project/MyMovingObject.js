import {CGFappearance, CGFobject} from '../lib/CGF.js';
import {MyTriangle} from "./MyTriangle.js";
import {MyQuad} from "./MyQuad.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyMovingObject extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initMaterials();
		//angle around YY with 0 in z+
		this.orientation = 0.0;
		this.velocity = [0.0,0.0,0.0];
		this.position = [0.0,0.0,0.0]; 
		this.scale = 1;
		this.tri0 = new MyTriangle(scene);
		this.tri1 = new MyTriangle(scene);
		this.tri2 = new MyTriangle(scene);
		this.tri3 = new MyTriangle(scene);
		this.quad = new MyQuad(scene);
	}
	
	initMaterials(){
		this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1.0, 0.0, 0.0, 1);
        this.material.setDiffuse(1.0, 1.0, 1.0, 1);
        this.material.setSpecular(1.0, 1.0, 1.0, 1);
        this.material.setShininess(10.0);
	}

	turn(val){
		this.orientation += val;
	}

	accelerate(val){
		this.velocity[2] += val;
	}

	reset(){
		this.position = [0,0,0];
		this.velocity = [0,0,0];
		this.orientation = 0;
	}

	updateScale(s){
		this.scale=s;
	}

	update(speedFactor){
		var cos = Math.cos(this.orientation);
		var sin = Math.sin(this.orientation);
		/**var rotation = [
						cos,	0,	-sin,	0,
						0,		1,	0,		0,
						sin,	0,	cos,	0,
						0,		0,	0,		1
					];*/
		this.position[0] += (this.velocity[0]*cos + this.velocity[2]*sin)*speedFactor;
		this.position[1] += this.velocity[1];
		this.position[2] += (this.velocity[2]*cos - this.velocity[0]*sin)*speedFactor;
		// this.pos += rotation * this.velocity;
	}

	display(){
		this.scene.pushMatrix();
		this.scene.translate(this.position[0],this.position[1], this.position[2]);
		this.scene.scale(this.scale,this.scale,this.scale);
		this.scene.rotate(this.orientation,0,1,0);

			this.scene.pushMatrix();
			this.scene.translate(0,0,-0.5);
			this.scene.rotate(Math.PI,0,1,0);
			this.material.apply();
			this.quad.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.tri0.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2,0,0,1);
			this.tri1.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.rotate(Math.PI,0,0,1);
			this.tri2.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2,0,0,1);
			this.tri3.display();
			this.scene.popMatrix();

		this.scene.popMatrix();
	}
}

