import {CGFobject} from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject{
    constructor(scene, numRocks){
        super(scene);
        this.numRocks = numRocks;
        this.rocks = [];
        this.initBuffers();
    }

    initBuffers(numRocks){
        for(var i = 0; i < this.numRocks; i++){
            this.rocks.push(new MyRock(this.scene,16,8));
        }
    }

    display(){
        for(var i = 0; i < this.rocks.length; i++){
            this.rocks[i].display();
        }
    }
}