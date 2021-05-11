import {CGFappearance, CGFobject,CGFtexture,CGFshader} from '../lib/CGF.js';
import {MyPlane} from './MyPlane.js';

export class MySky extends CGFobject {
    constructor(scene) {
		super(scene);
		this.sky = new MyPlane(scene);

        this.material = new CGFappearance(scene);
        this.material.setAmbient(0.9, 0.9, 0.9, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.3, 0.3, 0.3, 1);
        this.material.setEmission(0.0, 0.0, 0.0, 1);

        this.texture = new CGFtexture(this.scene,'images/pier.jpg');
        this.normal = new CGFtexture(this.scene,'images/distortionmap.png');
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('MIRRORED_REPEAT', 'MIRRORED_REPEAT');

        this.shader = new CGFshader(this.scene.gl, 'shaders/skyShader.vert', 'shaders/skyShader.frag');
        this.shader.setUniformsValues({uSampler2: 1});
        this.shader.setUniformsValues({texScale : 0.5});
        this.shader.setUniformsValues({timeFactor : 0});
    }

    update(t){
        this.shader.setUniformsValues({ timeFactor: t / 100 % 100 });
    }

    display(){
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.shader);
        this.material.apply();
        this.normal.bind(1);
        this.scene.translate(0,10,0);
        this.scene.scale(50,1,50);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.sky.display();
        
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();

    }
}