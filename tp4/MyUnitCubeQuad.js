import {CGFappearance, CGFobject} from '../lib/CGF.js';
import {MyQuad} from "./MyQuad.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, texY = 0, texZ = 0, texX = 0, tex_z = 0, tex_x = 0, tex_y = 0) {
		super(scene);
		this.texY = texY;
		this.texZ = texZ;
		this.texX = texX;
		this.tex_z = tex_z;
		this.tex_x = tex_x;
		this.tex_y = tex_y;
		this.initMaterials();
		this.quad0 = new MyQuad(scene);
		this.quad1 = new MyQuad(scene);
		this.quad2 = new MyQuad(scene);
		this.quad3 = new MyQuad(scene);
		this.quad4 = new MyQuad(scene);
		this.quad5 = new MyQuad(scene);
	}
	
	initMaterials(){
		this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1.0, 1.0, 1.0, 1);
        this.material.setDiffuse(1.0, 1.0, 1.0, 1);
        this.material.setSpecular(1.0, 1.0, 1.0, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/tangram.png');
        this.material.setTextureWrap('REPEAT', 'REPEAT');
	}


	display(){
		this.scene.pushMatrix();

		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		if(this.tex_z!= 0)
			this.material.setTexture(this.tex_z);
		this.material.apply();
		this.scene.pushMatrix();
		this.scene.translate(0,0,-0.5);
		this.scene.rotate(Math.PI,0,1,0);
		this.quad0.display();
		this.scene.popMatrix();

		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		if(this.texZ!= 0)
			this.material.setTexture(this.texZ);
		this.material.apply();
		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.quad1.display();
		this.scene.popMatrix();

		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		if(this.texX!= 0)
			this.material.setTexture(this.texX);
		this.material.apply();
		this.scene.pushMatrix();
		this.scene.translate(0.5,0,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.quad2.display();
		this.scene.popMatrix();

		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		if(this.tex_x!= 0)
			this.material.setTexture(this.tex_x);
		this.material.apply();
		this.scene.pushMatrix();
		this.scene.translate(-0.5,0,0);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.quad3.display();
		this.scene.popMatrix();

		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		if(this.tex_y!= 0)
			this.material.setTexture(this.tex_y);
		this.material.apply();
		this.scene.pushMatrix();
		this.scene.translate(0,-0.5,0);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.quad4.display();
		this.scene.popMatrix();

		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		if(this.texY!= 0)
			this.material.setTexture(this.texY);
		this.material.apply();
		this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.quad5.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}
}

