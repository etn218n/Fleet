import { Component } from "./component";
import { Camera as ThreeCamera, 
         PerspectiveCamera as ThreePerspectiveCamera } from "three";

class Camera extends Component {
    protected Implementation:ThreeCamera;

    get implementation() { return this.Implementation; }

    public onBeforeRender() {
        this.Implementation.position.set(this.transform.position.x, 
                                         this.transform.position.y, 
                                         this.transform.position.z);

        this.Implementation.rotation.set(this.transform.eulerAngles.x, 
                                         this.transform.eulerAngles.y, 
                                         this.transform.eulerAngles.z);
    }
}

class PerspectiveCamera extends Camera {
    constructor(fov : number, aspect : number, near : number, far : number ) {
        super();
        this.Implementation = new ThreePerspectiveCamera(fov, aspect, near, far);
    }
}

export { Camera, PerspectiveCamera };