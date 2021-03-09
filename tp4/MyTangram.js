import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";


export class MyTangram extends CGFobject{
    constructor(scene){
        super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangleS = new MyTriangleSmall(scene);
        this.initMaterials();
    }

    initMaterials(){
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.material.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.material.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/tangram.png');
        this.material.setTextureWrap('REPEAT', 'REPEAT');

    }

    display(){

        //gree
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(2,2,0);
        this.diamond.display();
        this.scene.popMatrix();

        //blue
        this.triangle.updateTexBlue();
        this.scene.pushMatrix();
        this.scene.translate(0.5,-0.5,0);
        this.scene.scale(2,2,2);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();

        //orange
        this.triangle.updateTexOrange();
        this.scene.pushMatrix();
        this.scene.translate(-1,-2,0);
        this.scene.scale(2,2,2);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();

        //pink
        this.triangle.updateTexPink();
        this.scene.pushMatrix();
        this.scene.translate(1.5,-3.5,0);
        this.scene.rotate(Math.PI,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();

        //yellow
        this.scene.pushMatrix();
        this.scene.translate(-3,-0.5,0);
        this.scene.rotate(3*Math.PI/7,0,0,1);
        this.scene.scale(-1,1,1);
        this.parallelogram.display();
        this.scene.popMatrix();
        
        //purple
        this.triangleS.updateTexPurple();
        this.scene.pushMatrix();
        this.scene.translate(3,3,0);
        this.scene.rotate(Math.PI,0,0,1);
        this.triangleS.display();
        this.scene.popMatrix();

        //red
        this.triangleS.updateTexRed();
        this.scene.pushMatrix();
        this.scene.translate(-2,-4,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.triangleS.display();
        this.scene.popMatrix();
    }
}