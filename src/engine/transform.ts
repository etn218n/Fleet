import { Component } from "./component";
import { Vector3, Quaternion, Euler, Matrix4 } from "three";

class Transform extends Component {
    private Scale:Vector3 = new Vector3(1, 1, 1);
    private Position:Vector3 = new Vector3(0, 0, 0);
    private EulerAngles:Euler = new Euler(0, 0, 0);
    private Rotation:Quaternion = new Quaternion(0, 0, 0, 1);

    private LocalMatrix:Matrix4  = new Matrix4();
    private WorldMaxtrix:Matrix4 = new Matrix4();

    constructor() {
        super();
        this.WorldMaxtrix.setPosition(0, 0, 0);
        this.WorldMaxtrix.makeScale(1, 1, 1);
        this.WorldMaxtrix.makeRotationFromQuaternion(new Quaternion(0, 0, 0, 1));
    }

    get scale()       { return this.Scale.setFromMatrixScale(this.WorldMaxtrix); }
    get position()    { return this.Position.setFromMatrixPosition(this.WorldMaxtrix); }
    get rotation()    { return this.Rotation.setFromRotationMatrix(this.WorldMaxtrix); }
    get eulerAngles() { return this.EulerAngles.setFromRotationMatrix(this.WorldMaxtrix); }

    set position(value : Vector3) {
        this.WorldMaxtrix.setPosition(value.x, value.y, value.z);
    }

    public rotateAroundX(thetaRadian: number) {
        this.WorldMaxtrix.makeRotationX(thetaRadian);
    }
}

export { Transform };