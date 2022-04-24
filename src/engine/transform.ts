import { Vector3, Quaternion, Euler } from "three";

class Transform {
    private Scale:Vector3 = new Vector3(1, 1, 1);
    private Position:Vector3 = new Vector3(0, 0, 0);
    private EulerAngles:Euler = new Euler(0, 0, 0);
    private Rotation:Quaternion = new Quaternion(0, 0, 0, 1);

    get scale()       { return this.Scale;       }
    get position()    { return this.Position;    }
    get rotation()    { return this.Rotation;    }
    get eulerAngles() { return this.EulerAngles; }

    set position(value : Vector3) {
        this.Position = value;
    }
}

export { Transform };