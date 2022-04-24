import { Component } from "./component";
import { Mesh as ThreeMesh, 
         Material as ThreeMaterial,
         BufferGeometry as ThreeGeometry } from "three";

class MeshRenderer extends Component {
    public mesh:ThreeMesh;
    public material:ThreeMaterial;
    public geometry:ThreeGeometry;

    public onBeforeRender() {
        this.mesh.scale.set(this.transform.scale.x,
                            this.transform.scale.y,
                            this.transform.scale.z);

        this.mesh.position.set(this.transform.position.x, 
                               this.transform.position.y, 
                               this.transform.position.z);

        this.mesh.rotation.set(this.transform.eulerAngles.x, 
                               this.transform.eulerAngles.y, 
                               this.transform.eulerAngles.z);
    }
}

export { MeshRenderer };