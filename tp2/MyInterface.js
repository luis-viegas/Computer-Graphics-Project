import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        this.gui.add(this.scene,'diamondVisable').name('Diamond visable');
        
        this.gui.add(this.scene,'triangleVisable').name('Triangle visable');
       
        this.gui.add(this.scene,'parallelogramVisable').name('Parallelogram visable');
        
        this.gui.add(this.scene,'triangleSVisable').name('Small Triangle visable');

        this.gui.add(this.scene,'triangleBVisable').name('Big Triangle visable');
        
        this.gui.add(this.scene, 'tangramVisible').name('Tangram Visible');

        this.gui.add(this.scene, 'cubeVisible').name('Show Unit Cube');

        this.gui.add(this.scene, 'parallelXZ').name('Parallel to XZ plane');
        
        this.gui.add(this.scene, 'cubeQuadVisible').name('Show CubeQuad');
        
        return true;
    }
}