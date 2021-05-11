import {CGFappearance, CGFobject,CGFtexture,CGFshader} from '../lib/CGF.js';
import {MyPlane} from './MyPlane.js';
import {MySphere} from './MySphere.js';

export class MySeaFloor extends CGFobject {
	constructor(scene,X = 0, Z = 0, size = 5, divisions = 100) {
		super(scene);
		this.floor = new MyPlane(scene,divisions);
        this.nest = new MySphere(scene, 16, 8);
        this.nestX = X;
        this.nestZ = Z;
        this.nestSize = 5<size?5:size;
        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.9, 0.9, 0.9, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.3, 0.3, 0.3, 1);
        this.material.setEmission(0.0, 0.0, 0.0, 1);

        //the 2 following textures are free to use and where obtained from https://3dtextures.me/2019/07/24/dragon-scales-001/
        this.floorTexture = new CGFtexture(this.scene,'images/sand.png');
        this.floorNormal = new CGFtexture(this.scene,'images/sandMap.png');
        this.material.setTexture(this.floorTexture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.nestMaterial = new CGFappearance(scene);
        this.nestMaterial.setAmbient(0.82,0.67,0.43,1.0);
        this.nestMaterial.setDiffuse(0.82,0.67,0.43,1.0);
        this.nestMaterial.setSpecular(0.5,0.5,0.5,1.0);

        this.nestTexture = new CGFtexture(this.scene,'images/seashellTex/everytexture.com-stock-nature-mold-moss-texture-00014.jpg');
        this.nestNormal = new CGFtexture(this.scene,'images/seashellTex/everytexture.com-stock-nature-mold-moss-texture-00014-normal-1024.jpg');
        this.nestMaterial.setTexture(this.nestTexture);
        this.nestMaterial.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

        this.floorShader = new CGFshader(this.scene.gl, 'shaders/sea_floor.vert', 'shaders/sea_floor.frag');
        this.floorShader.setUniformsValues({uSampler2: 1});
        this.floorShader.setUniformsValues({texScale : 50.0});

        this.nestShader = new CGFshader(this.scene.gl, 'shaders/seashell.vert', 'shaders/seashell.frag');
        this.nestShader.setUniformsValues({uSampler2: 1});
        this.nestShader.setUniformsValues({texScale : 1.0});
	}

    display(){
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.floorShader);
        this.material.apply();
        this.floorNormal.bind(1);
        this.scene.scale(50,10,50);
        // this.scene.translate(0,-0.05,0.25);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.floor.display();
        this.scene.popMatrix();
        
        
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.nestShader);
        this.nestMaterial.apply();
        this.nestNormal.bind(1);
        this.scene.translate(this.nestX,0,this.nestZ);
        this.scene.scale(this.nestSize,0.8,this.nestSize);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.nest.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}