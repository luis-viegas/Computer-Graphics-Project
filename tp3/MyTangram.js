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
        this.materialPurple = new CGFappearance(this.scene);
        this.materialPurple.setAmbient(0.59, 0.31, 0.75, 1.0);
        this.materialPurple.setDiffuse(0.59, 0.31, 0.75, 1.0);
        this.materialPurple.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.materialPurple.setShininess(10.0);

        this.materialGreen = new CGFappearance(this.scene);
        this.materialGreen.setAmbient(0.0, 1.0, 0.0, 1.0);
        this.materialGreen.setDiffuse(0.0, 1.0, 0.0, 1.0);
        this.materialGreen.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.materialGreen.setShininess(10.0);

        this.materialBlue = new CGFappearance(this.scene);
        this.materialBlue.setAmbient(0.0, 0.61, 1.0, 1.0);
        this.materialBlue.setDiffuse(0.0, 0.61, 1.0, 1.0);
        this.materialBlue.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.materialBlue.setShininess(10.0);

        this.materialOrange = new CGFappearance(this.scene);
        this.materialOrange.setAmbient(1.0, 0.61, 0.0, 1.0);
        this.materialOrange.setDiffuse(1.0, 0.61, 0.0, 1.0);
        this.materialOrange.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.materialOrange.setShininess(10.0);
    
        this.materialYellow = new CGFappearance(this.scene);
        this.materialYellow.setAmbient(1.0, 1.0, 0.0, 1.0);
        this.materialYellow.setDiffuse(1.0, 1.0, 0.0, 1.0);
        this.materialYellow.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.materialYellow.setShininess(10.0);
    
        this.materialPink = new CGFappearance(this.scene);
        this.materialPink.setAmbient(1.0, 0.61, 0.81, 1.0);
        this.materialPink.setDiffuse(1.0, 0.61, 0.81, 1.0);
        this.materialPink.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.materialPink.setShininess(10.0);

        this.materialRed = new CGFappearance(this.scene);
        this.materialRed.setAmbient(1.0, 0.11, 0.11, 1.0);
        this.materialRed.setDiffuse(1.0, 0.11, 0.11, 1.0);
        this.materialRed.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.materialRed.setShininess(10.0);
    }

    display(){

        this.scene.customMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(2,2,0);
        this.diamond.display();
        this.scene.popMatrix();

        this.materialBlue.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.5,-0.5,0);
        this.scene.scale(2,2,2);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();

        this.materialOrange.apply();
        this.scene.pushMatrix();
        this.scene.translate(-1,-2,0);
        this.scene.scale(2,2,2);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();

        this.materialPink.apply();
        this.scene.pushMatrix();
        this.scene.translate(1.5,-3.5,0);
        this.scene.rotate(Math.PI,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();

        this.materialYellow.apply();
        this.scene.pushMatrix();
        this.scene.translate(-3,-0.5,0);
        this.scene.rotate(3*Math.PI/7,0,0,1);
        this.scene.scale(-1,1,1);
        this.parallelogram.display();
        this.scene.popMatrix();
        
        this.materialPurple.apply();
        this.scene.pushMatrix();
        this.scene.translate(3,3,0);
        this.scene.rotate(Math.PI,0,0,1);
        this.triangleS.display();
        this.scene.popMatrix();

        this.materialRed.apply();
        this.scene.pushMatrix();
        this.scene.translate(-2,-4,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.triangleS.display();
        this.scene.popMatrix();
    }
}