import {CGFobject} from '../lib/CGF.js';
import {MySeaweed} from './MySeaweed.js';

export class MySeaweedSet extends CGFobject{
    constructor(scene, numOfWeeds){
        super(scene);
        this.num = numOfWeeds;
        this.weeds = [];
        this.initBuffers();
    }

    initBuffers(){
        for(var i = 0; i < this.num; i++){
            var X = Math.random()*50-25;
            var Z = Math.random()*50-25;
            var stacks = 10+Math.floor(Math.random()*10);
            this.weeds.push(new MySeaweed(this.scene,10,stacks,X,Z));
        }
    }

    update(t){
        for(var i = 0; i < this.weeds.length; i++){
            this.weeds[i].update(t);
        }
    }
    display(){
        for(var i = 0; i < this.weeds.length; i++){
            this.weeds[i].display();
        }
    }
}