import { Component } from "./component";
import { Mesh as ThreeMesh, 
         Material as ThreeMaterial,
         BufferGeometry as ThreeGeometry } from "three";

class MeshRenderer extends Component {
    public mesh:ThreeMesh;
    public material:ThreeMaterial;
    public geometry:ThreeGeometry;
}

export { MeshRenderer };