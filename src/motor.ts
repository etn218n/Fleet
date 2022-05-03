import { Component } from "./engine/component";

class Motor extends Component {
    private n:number = 0;

    public onUpdate() {
        this.n += 0.01;
        this.transform.rotateAroundX(this.n);
    }
}

export { Motor };