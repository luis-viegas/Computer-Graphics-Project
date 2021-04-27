import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCylinder extends CGFobject {
    constructor(scene, slices, tex) {
        super(scene);
        this.slices = slices;
        this.texture = tex;
        //this.stacks = stacks;
        this.initMaterials();
        this.initBuffers();
    }

    initMaterials(){
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.8, 0.8, 0.8, 1);
        this.material.setDiffuse(0.5, 0.5, 0.5, 1);
        this.material.setSpecular(0.0, 0.0, 0.0, 1);
        this.material.setEmission(0.0, 0.0, 0.0, 1);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){

            this.vertices.push(Math.cos(ang)/2.0, 1, -Math.sin(ang)/2.0);
            this.vertices.push(Math.cos(ang)/2.0, 0, -Math.sin(ang)/2.0);
            this.texCoords.push(i/this.slices,0.0);
            this.texCoords.push(i/this.slices,1.0);
            this.indices.push(2*i, (2*i+1), (2*i+3));
            this.indices.push(2*i, (2*i+3), (2*i+2));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            ang+=alphaAng;
        }
        this.vertices.push(1.0/2.0, 1, 0.0);
        this.vertices.push(1.0/2.0, 0, 0.0);
        this.texCoords.push(1.0, 0.0);
        this.texCoords.push(1.0, 1.0);
        this.normals.push(1, 0, 0);
        this.normals.push(1, 0, 0);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(slices){
        this.slices = Math.round(slices);

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    display(){
        this.material.setTexture(this.texture);
        this.material.apply();
        super.display();
    }
}


