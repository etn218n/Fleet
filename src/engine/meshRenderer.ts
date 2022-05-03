import { Mesh } from "three";
import { Component } from "./component";

class MeshRenderer extends Component {
    private Mesh:Mesh;

    set mesh(value : Mesh) {
        this.Mesh = value;
        this.Mesh.matrixAutoUpdate = false;
    }

    get mesh() { return this.Mesh; }

    public onBeforeRender() {
        this.Mesh.scale.set(this.transform.scale.x,
                            this.transform.scale.y,
                            this.transform.scale.z);

        this.Mesh.position.set(this.transform.position.x, 
                               this.transform.position.y, 
                               this.transform.position.z);

        this.Mesh.rotation.set(this.transform.eulerAngles.x, 
                               this.transform.eulerAngles.y, 
                               this.transform.eulerAngles.z);

        this.mesh.updateMatrixWorld();
    }
}

export { MeshRenderer };