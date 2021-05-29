import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
/**
* MySeaweed
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MySeaweed extends CGFobject {
    constructor(scene, slices = 10, stacks = 10, posX = 0, posZ = 0, color = null, heightScalar = 1) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.pos = [posX, posZ];
        if(color!=null) this.material = color;
        else this.initMaterials();
        this.initBuffers();
        this.initShaders();
        this.scale = heightScalar;

    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        var height = 1;
        for(var j = 0; j < this.stacks;j++){
            var width = (this.stacks-height)/this.stacks;
            var widthBellow = (this.stacks-height+1)/this.stacks;
            if(j!=this.stacks-1){
                var ang = 0;
                var alphaAng = 2*Math.PI/this.slices;
                for(var i = 0; i < this.slices; i++){
                    // All vertices have to be declared for a given face
                    // even if they are shared with others, as the normals 
                    // in each face will be different

                    var sa=Math.sin(ang);
                    var saa=Math.sin(ang+alphaAng);
                    var ca=Math.cos(ang);
                    var caa=Math.cos(ang+alphaAng);

                    this.vertices.push(ca*width, height, -sa*width);
                    this.vertices.push(ca*widthBellow, height-1, -sa*widthBellow);
                    this.vertices.push(caa*width, height, -saa*width);
                    this.vertices.push(caa*widthBellow, height-1, -saa*widthBellow);

                    // triangle normal computed by cross product of two edges
                    var normal= [
                        saa-sa,
                        ca*saa-sa*caa,
                        caa-ca
                    ];

                    // normalization
                    var nsize=Math.sqrt(
                        normal[0]*normal[0]+
                        normal[1]*normal[1]+
                        normal[2]*normal[2]
                        );
                    normal[0]/=nsize;
                    normal[1]/=nsize;
                    normal[2]/=nsize;

                    // push normal once for each vertex of this triangle
                    this.normals.push(...normal);
                    this.normals.push(...normal);
                    this.normals.push(...normal);
                    this.normals.push(...normal);

                    this.indices.push(4*(j*this.slices+i), 4*(j*this.slices+i)+1 , 4*(j*this.slices+i)+2 );
                    this.indices.push(4*(j*this.slices+i)+1, 4*(j*this.slices+i)+3 , 4*(j*this.slices+i)+2 );

                    ang+=alphaAng;
                }
            }else{
                var ang = 0;
                var alphaAng = 2*Math.PI/this.slices;
                for(var i = 0; i < this.slices; i++){
                    // All vertices have to be declared for a given face
                    // even if they are shared with others, as the normals 
                    // in each face will be different

                    var sa=Math.sin(ang);
                    var saa=Math.sin(ang+alphaAng);
                    var ca=Math.cos(ang);
                    var caa=Math.cos(ang+alphaAng);

                    this.vertices.push(0,height,0);
                    this.vertices.push(ca*widthBellow, height-1, -sa*widthBellow);
                    this.vertices.push(caa*widthBellow, height-1, -saa*widthBellow);

                    // triangle normal computed by cross product of two edges
                    var normal= [
                        saa-sa,
                        ca*saa-sa*caa,
                        caa-ca
                    ];

                    // normalization
                    var nsize=Math.sqrt(
                        normal[0]*normal[0]+
                        normal[1]*normal[1]+
                        normal[2]*normal[2]
                        );
                    normal[0]/=nsize;
                    normal[1]/=nsize;
                    normal[2]/=nsize;

                    // push normal once for each vertex of this triangle
                    this.normals.push(...normal);
                    this.normals.push(...normal);
                    this.normals.push(...normal);

                    this.indices.push(4*j*this.slices+3*i, 4*j*this.slices+(3*i+1) , 4*j*this.slices+(3*i+2) );

                    ang+=alphaAng;
                }
            }
            height++;
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
    initMaterials(){
        this.material = new CGFappearance(this.scene);
        var R = Math.random();
        var G = Math.random();
        var B = Math.random();
        this.material.setAmbient(R, G, B, 1);
        this.material.setDiffuse(R, G, B, 1);
        this.material.setSpecular(0.3, 0.3, 0.3, 1);
        this.material.setEmission(0.0, 0.0, 0.0, 1);
    }
    update(t){
        this.shader.setUniformsValues({ timeFactor: t / 100 % 314 });
    }

    initShaders(){
        this.shader = new CGFshader(this.scene.gl, 'shaders/seaweedShader.vert', 'shaders/seaweedShader.frag');
        this.shader.setUniformsValues({timeFactor : 0});
    }

    display(){
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.shader);
        this.material.apply();
        this.scene.translate(this.pos[0],0,this.pos[1]);
        this.scene.scale(0.1,0.2*this.scale,0.1);
        super.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
}