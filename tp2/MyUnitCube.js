import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5,
			-0.5, -0.5, 0.5,
			-0.5, 0.5, -0.5,
			-0.5, 0.5, 0.5,
			0.5, -0.5, -0.5,
			0.5, -0.5, 0.5,
			0.5, 0.5, -0.5,
			0.5, 0.5, 0.5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,  //1
			1, 3, 2,  //1
			2, 4, 0,  //2
			2, 6, 4,  //2
			5, 4, 6,  //3
			5, 6, 7,  //3
			1, 5, 7,  //4
			1, 7, 3,  //4
			3, 6, 2,  //5
			3, 7, 6,  //5
			1, 0, 4,  //6
			1, 4, 5   //6
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

