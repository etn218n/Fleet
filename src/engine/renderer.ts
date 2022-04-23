import { Scene } from "./scene";
import { WebGLRenderer } from "three";

class Renderer {
    private readonly Renderer:WebGLRenderer;

    constructor(canvasWidth, canvasHeight) {
        this.Renderer = new WebGLRenderer();
        this.Renderer.setSize(canvasWidth, canvasHeight);
        document.body.appendChild(this.Renderer.domElement);
    }

    public render(scene : Scene) {
        if (scene === undefined)
            return;
        
        this.Renderer.render(scene.renderScene, scene.mainCamera.implementation);
    }
}

export { Renderer };