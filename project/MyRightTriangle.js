import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
 export class MyRightTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, 0.5, 0,	//0
			-0.5,-0.5, 0,	//1
			 0.5, -0.5, 0,	//2
			-0.5, 0.5, 0,	//0
			-0.5,-0.5, 0,	//1
			 0.5, -0.5, 0	//2

		];

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,-1,
			0,0,-1,
			0,0,-1
		]
		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 1, 0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
	updateTexBlue(){
		this.texCoords = [
			0.0,0.0,
			0.5,0.5,
			1.0,0.0
		];
		this.updateTexCoordsGLBuffers();
	}

	updateTexOrange(){
		this.texCoords = [
			1.0,0.0,
			0.5,0.5,
			1.0,1.0
		];
		this.updateTexCoordsGLBuffers();
	}

	updateTexPink(){
		this.texCoords = [
			0.0,0.5,
			0.0,1.0,
			0.5,1.0
		];
		this.updateTexCoordsGLBuffers();
	}
}

