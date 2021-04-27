import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MySphere } from "./MySphere.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyFish } from "./MyFish.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);
        
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.movingObject = new MyMovingObject(this);
        
        this.tex12345 = new CGFtexture(this, "images/tex12345.png");
        this.cylinder = new MyCylinder(this, 3, this.tex12345);
        this.mainFish = new MyFish(this, 16, 8);
        
        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);
        
		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);
        this.earthTex = new CGFtexture(this, "images/earth.jpg");
        this.sphereAppearance.setTexture(this.earthTex);
        
        this.demoCubeTex_z = new CGFtexture(this, "images/demo_cubemap/front.png");
        this.demoCubeTex_Z = new CGFtexture(this, "images/demo_cubemap/back.png");
        this.demoCubeTex_x = new CGFtexture(this, "images/demo_cubemap/left.png");
        this.demoCubeTex_X = new CGFtexture(this, "images/demo_cubemap/right.png");
        this.demoCubeTex_y = new CGFtexture(this, "images/demo_cubemap/bottom.png");
        this.demoCubeTex_Y = new CGFtexture(this, "images/demo_cubemap/top.png");
        this.demoCubeTex = [this.demoCubeTex_Y, this.demoCubeTex_Z, this.demoCubeTex_X, this.demoCubeTex_z, this.demoCubeTex_x, this.demoCubeTex_y];
        
        this.testCubeTex_z = new CGFtexture(this, "images/test_cubemap/nz.png");
        this.testCubeTex_Z = new CGFtexture(this, "images/test_cubemap/pz.png");
        this.testCubeTex_x = new CGFtexture(this, "images/test_cubemap/nx.png");
        this.testCubeTex_X = new CGFtexture(this, "images/test_cubemap/px.png");
        this.testCubeTex_y = new CGFtexture(this, "images/test_cubemap/ny.png");
        this.testCubeTex_Y = new CGFtexture(this, "images/test_cubemap/py.png");
        this.testCubeTex = [this.testCubeTex_Y, this.testCubeTex_Z, this.testCubeTex_X, this.testCubeTex_z, this.testCubeTex_x, this.testCubeTex_y];
        this.cubeTex = [this.demoCubeTex, this.testCubeTex];
        
        this.cubeMap = new MyCubeMap(this, this.demoCubeTex_Y, this.demoCubeTex_Z, this.demoCubeTex_X,
                                     this.demoCubeTex_z, this.demoCubeTex_x, this.demoCubeTex_y);
        
        this.selectedMapTex = 0;
        this.cylinderSlices = 3;
        this.scaleFactor = 1;
        this.speedFactor = 1;
        this.textureIds = { 'Demo CubeMap': 0, 'Test CubeMap': 1};
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displaySphere = false;
        this.displayMovingObject = false;
        this.displayCubeMap = true;
        this.displayCylinder = false;
        this.displayFish = true;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            keysPressed=true;
            this.movingObject.accelerate(0.01);
        }
        if (this.gui.isKeyPressed("KeyS"))        {
            text+=" S ";
            keysPressed=true;
            this.movingObject.accelerate(-0.01);
        }
        if (this.gui.isKeyPressed("KeyA"))        {
            text+=" A ";
            keysPressed=true;
            this.movingObject.turn(0.1);
        }
        if (this.gui.isKeyPressed("KeyD"))        {
            text+=" D ";
            keysPressed=true;
            this.movingObject.turn(-0.1);
        }
        if (this.gui.isKeyPressed("KeyR"))        {
            text+=" R ";
            keysPressed=true;
            this.movingObject.reset();
        }
        if (keysPressed)
            console.log(text);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.movingObject.update(this.speedFactor);
        //To be done...
    }

    updateCylinderDimensions(){
        this.cylinder.updateBuffers(this.cylinderSlices);
    }

    updateMovingObjectScale(){
        this.movingObject.updateScale(this.scaleFactor);
    }

    updateMapTex(){
        var texture = this.cubeTex[this.selectedMapTex];
        this.cubeMap.updateTex(texture[0], texture[1], texture[2], texture[3], texture[4], texture[5]);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        
        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.sphereAppearance.apply();
        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        if(this.displaySphere)
            this.incompleteSphere.display();

        if(this.displayMovingObject)
            this.movingObject.display();

        if(this.displayCubeMap)
            this.cubeMap.display();

        if(this.displayCylinder)
            this.cylinder.display();
        
        if(this.displayFish)
            this.mainFish.display();
        // ---- END Primitive drawing section
    }
}