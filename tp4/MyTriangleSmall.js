import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			1, 0, 0,	//1
			0, 1, 0		//2

		];

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1
		]
		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateTexPurple(){
		this.texCoords = [
			0.0,0.0,
			0.0,0.5,
			0.25,0.25
		];
		this.updateTexCoordsGLBuffers();
	}
	updateTexRed(){
		this.texCoords = [
			0.25,0.75,
			0.75,0.75,
			0.5,0.5
		];
		this.updateTexCoordsGLBuffers();
	}
}

