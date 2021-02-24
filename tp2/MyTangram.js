import {CGFobject} from '../lib/CGF.js';
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
    }

    display(scene){

        scene.pushMatrix();
        scene.translate(2,2,0);
        this.diamond.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.translate(0.5,-0.5,0);
        scene.scale(2,2,2);
        scene.rotate(Math.PI/2,0,0,1);
        this.triangle.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.translate(-1,-2,0);
        scene.scale(2,2,2);
        scene.rotate(-Math.PI/2,0,0,1);
        this.triangle.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.translate(1.5,-3.5,0);
        scene.rotate(Math.PI,0,0,1);
        this.triangle.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.translate(-3,-0.5,0);
        scene.rotate(3*Math.PI/7,0,0,1);
        scene.scale(-1,1,1);
        this.parallelogram.display();
        scene.popMatrix();
        
        scene.pushMatrix();
        scene.translate(3,3,0);
        scene.rotate(Math.PI,0,0,1);
        this.triangleS.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.translate(-2,-4,0);
        scene.rotate(Math.PI/2,0,0,1);
        this.triangleS.display();
        scene.popMatrix();
    }
}