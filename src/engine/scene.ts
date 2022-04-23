import { Entity } from "./entity";
import { Camera } from "./camera";
import { MeshRenderer } from "./meshRenderer";
import { Scene as RenderScene } from "three";

class Scene {
    private MainCamera:Camera;
    private ActiveEntities:Entity[] = [];
    private RenderScene:RenderScene = new RenderScene();

    get mainCamera()     { return this.MainCamera;     }
    get renderScene()    { return this.RenderScene;    }
    get activeEntities() { return this.ActiveEntities; }

    public add(entity : Entity) {
        if (this.ActiveEntities.includes(entity))
            return;

        this.ActiveEntities.push(entity);
        this.setMainCamera(entity);
        
        let meshRenderer = entity.getComponent(MeshRenderer);
        if (meshRenderer !== undefined)
            this.renderScene.add(meshRenderer.mesh);
    }

    public setMainCamera(entity : Entity) {
        if (this.isValidCameraEntity(entity))
            this.MainCamera = entity.getComponent(Camera);
    }

    private isValidCameraEntity(entity : Entity) : boolean {
        if (entity === undefined || entity === null)
            return false;

        if (!this.activeEntities.includes(entity))
            return false;

        if (!entity.hasComponent(Camera))
            return false;

        return true;
    }
}

export { Scene };