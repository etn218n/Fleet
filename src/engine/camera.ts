import { Component } from "./component";
import { Camera as ThreeCamera, 
         PerspectiveCamera as ThreePerspectiveCamera } from "three";

class Camera extends Component {
    protected Implementation:ThreeCamera;

    get implementation() { return this.Implementation; }
}

class PerspectiveCamera extends Camera {
    constructor(fov : number, aspect : number, near : number, far : number ) {
        super();
        this.Implementation = new ThreePerspectiveCamera(fov, aspect, near, far);
    }
}

export { Camera, PerspectiveCamera };