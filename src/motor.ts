import { Vector3 } from "three";
import { Component } from "./engine/component";

class Motor extends Component {
    public onUpdate() {
        this.transform.eulerAngles.x += 0.01;
        this.transform.eulerAngles.y += 0.01;
    }
}

export { Motor };