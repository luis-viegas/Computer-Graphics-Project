import {CGFappearance, CGFobject,CGFtexture,CGFshader} from '../lib/CGF.js';
import {MyQuad} from './MyQuad.js';

export class MySeaFloor extends CGFobject {
	constructor(scene) {
		super(scene);
		this.floor = new MyQuad(scene);
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.9, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.1, 0.1, 1);
        this.material.setSpecular(0.3, 0.3, 0.3, 1);
        this.material.setEmission(0.0, 0.0, 0.0, 1);
        //the 2 following textures are free to use and where obtained from https://3dtextures.me/2019/07/24/dragon-scales-001/
        this.texture = new CGFtexture(this.scene,'images/sand.png');
        this.normal = new CGFtexture(this.scene,'images/sandMap.png');
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.shader = new CGFshader(this.scene.gl, 'shaders/sea_floor.vert', 'shaders/sea_floor.frag');
        this.shader.setUniformsValues({uSampler2: 1});
	}

    display(){
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.shader);
        this.material.apply();
        this.normal.bind(1);
        this.scene.scale(500,0,500);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.floor.display();
  		this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
}