import{CGFobject} from '../lib/CGF.js';
import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';

export class MyMovingFish extends MyMovingObject{
    constructor(scene) {
		super(scene);
		this.initMaterials();
		//angle around YY with 0 in z+
		this.orientation = 0.0;
		this.velocity = [0.0,0.0,0.0];
		this.position = [0.0,5.0,0.0]; 
		this.scale = 1;
		this.fish = new MyFish(scene,32,16);
        this.holding = false;
        this.rock;
        this.rockOldPos = [0.0,0.0,0.0];
	}

    goUp(val){
        if(this.position[1]+val<5.0 && this.position[1]+val >= 0.5)
    		this.position[1]+=val;
	}

	steer(val){
        this.fish.steer(val);
    }

    grab(rocks, nestX, nestZ, nestSize){
        if(this.holding){
            var x = this.position[0]-nestX;
            var y = this.position[1];
            var z = this.position[2]-nestZ;
            if(this.position[1]<=0.6 && x*x+y*y+z*z<nestSize*nestSize){
                this.holding = false;
                this.rock.position[1] = 0.4;
                rocks.push(this.rock);
                this.rock = null;
            }
        } else
        for(var i = 0; i < rocks.length;i++){
            var x = rocks[i].position[0]-this.position[0];
            var y = rocks[i].position[1]-this.position[1];
            var z = rocks[i].position[2]-this.position[2];
            if(x*x+y*y+z*z<2.25){
                this.holding = true;
                this.rock = rocks[i];
                this.rockOldPos[0]= this.rock.position[0];
                this.rockOldPos[1]= this.rock.position[1];
                this.rockOldPos[2]= this.rock.position[2];
                rocks.splice(i,1);
                return;
            }
        }
    }


    update(speedFactor){
		var cos = Math.cos(this.orientation);
		var sin = Math.sin(this.orientation);
		/**var rotation = [
						cos,	0,	-sin,	0,
						0,		1,	0,		0,
						sin,	0,	cos,	0,
						0,		0,	0,		1
					];*/
		this.position[0] += (this.velocity[0]*cos + this.velocity[2]*sin)*speedFactor;
		this.position[1] += this.velocity[1];
		this.position[2] += (this.velocity[2]*cos - this.velocity[0]*sin)*speedFactor;
		// this.pos += rotation * this.velocity;
        if(this.holding){
            this.rock.position[0] = this.position[0];
            this.rock.position[1] = this.position[1]-0.5;
            this.rock.position[2] = this.position[2];
        }
	}

    stopSteer(val){
        this.fish.stopSteer(val);
    }

    reset(rocks){
		this.position = [0,5.0,0];
		this.velocity = [0,0,0];
		this.orientation = 0;
        if(this.holding){
            this.holding = false;
            this.rock.position[0] = this.rockOldPos[0];
            this.rock.position[1] = this.rockOldPos[1];
            this.rock.position[2] = this.rockOldPos[2];
            rocks.push(this.rock);
            this.rock = null;
        }
	}

    animate(t){
        this.fish.update(t,this.velocity[0]*this.velocity[0]+this.velocity[2]*this.velocity[2]);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.position[0],this.position[1], this.position[2]);
		this.scene.scale(this.scale,this.scale,this.scale);
		this.scene.rotate(this.orientation,0,1,0);
        this.fish.display();
        this.scene.popMatrix();
        if(this.holding){
            this.scene.pushMatrix();
            this.rock.display();
            this.scene.popMatrix();
        }
    }
}