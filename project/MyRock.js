import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';

export class MyRock extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
   */
  constructor(scene, slices, stacks) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    this.scales = [0.0,0.0,0.0];
    this.position = [0.0,0.0];

    this.initBuffers();
    this.initMaterials();
  }

  /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
  initBuffers() {

    this.scales[0] = Math.random()/12.5 + 0.04;
    this.scales[1] = Math.random()/12.5 + 0.04;
    this.scales[2] = Math.random()/12.5 + 0.04;
    this.position[0] = Math.random()*50.0-25;
    this.position[1] = Math.random()*50.0-25;

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;
    var thetaInc = (2 * Math.PI) / this.longDivs;
    var latVertices = this.longDivs + 1;

    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var x = Math.cos(theta) * sinPhi;
        var y = cosPhi;
        var z = Math.sin(-theta) * sinPhi;
        var offset = 0.9+(Math.random()/5.0);
        this.vertices.push(offset*x, offset*y, offset*z);

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)
          
          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the sphere to the vertex.
        // in a sphere of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);
        theta += thetaInc;

        //--- Texture Coordinates
        // To be done... 
        this.texCoords.push(longitude/this.longDivs,latitude/this.latDivs);
        // May need some additional code also in the beginning of the function.
        
      }
      phi += phiInc;
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
  
  initMaterials(){
    this.bodyMaterial = new CGFappearance(this.scene);
    this.bodyMaterial.setAmbient(0.9, 0.9, 0.9, 1);
    this.bodyMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.bodyMaterial.setSpecular(0.3, 0.3, 0.3, 1);
    this.bodyMaterial.setEmission(0.0, 0.0, 0.0, 1);
    //the 2 following textures are free to use and where obtained from https://3dtextures.me/2020/10/30/ground-wet-rocks-002/
    this.bodyTexture = new CGFtexture(this.scene,'images/rockTex/basecolor.jpg');
    // this.bodyNormal = new CGFtexture(this.scene,'images/rockTex/normal.jpg');
    this.bodyMaterial.setTexture(this.bodyTexture);
    this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');

    // this.bodyShader = new CGFshader(this.scene.gl, 'shaders/rockShader.vert', 'shaders/rockShader.frag');
    // this.bodyShader.setUniformsValues({uSampler2: 1});
  }

  display(){
    this.scene.pushMatrix();
    //this.scene.translate(this.rockX,5,0); <-- try this
    // this.scene.translate(0,5,0);

    //body
      // this.scene.setActiveShader(this.bodyShader);
      // this.bodyNormal.bind(1);
      this.bodyMaterial.apply();
      // this.scene.pushMatrix();
      this.scene.translate(this.position[0], 0, this.position[1]);
      this.scene.scale(this.scales[0], this.scales[1], this.scales[2]);
      super.display();
      // this.scene.popMatrix();
      // this.scene.setActiveShader(this.scene.defaultShader);

      this.scene.popMatrix();
  }

}
