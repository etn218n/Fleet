import * as Input from "./input";
import { Scene } from "./scene";
import { Renderer } from "./renderer";

class Engine {
    private Renderer:Renderer;
    private CurrentScene:Scene;

    private FixedLag:number  = 0;
    private FrameRate:number = 0;
    private FrameCount:number = 0;
    private DeltaTime:number  = 0;
    private FixedDeltaTime:number = 0;
    private FixedFrameRate:number = 50;
    private LastFrameTimeStamp:number = 0;
    private FrameCountInOneSecond:number = 0;
    private AccumulatedTimeInOneSecond:number = 0;

    get frameRate()  { return this.FrameRate;  };
    get frameCount() { return this.FrameCount; };
    
    public createRenderCanvas(width : number, height : number) {
        this.Renderer = new Renderer(width, height);
    }

    private update() {
        this.measureDeltaTime();
        this.measureAverageFPS();

        this.FixedLag += this.DeltaTime;
        this.FixedDeltaTime = 1000 / this.FixedFrameRate;

        while (this.FixedLag >= this.FixedDeltaTime) {
            this.FixedLag -= this.FixedDeltaTime;
            this.fixedUpdateActiveScene();
        }

        Input.update();
        this.updateCurrentScene();
        this.lateUpdateCurrentScene();
        this.beforeRenderCurrentScene();
        this.renderCurrentScene();

        requestAnimationFrame(() => this.update()); 
    }

    public loadScene(scene : Scene) {
        if (scene === undefined)
            return;

        if (scene.mainCamera === undefined) {
            console.log("Main camera not set.");
            return;
        }

        this.CurrentScene = scene;
        this.startCurrentScene();
        this.update();
    }

    private renderCurrentScene() {
        this.Renderer.render(this.CurrentScene);
    }

    private startCurrentScene() {
        for (const entity of this.CurrentScene.activeEntities)
            entity.start();
    }

    private updateCurrentScene() {
        for (const entity of this.CurrentScene.activeEntities)
            entity.update();
    }

    private lateUpdateCurrentScene() {
        for (const entity of this.CurrentScene.activeEntities)
            entity.lateUpdate();
    }

    private fixedUpdateActiveScene() {
        for (const entity of this.CurrentScene.activeEntities)
            entity.fixedUpdate();
    }

    private beforeRenderCurrentScene() {
        for (const entity of this.CurrentScene.activeEntities)
            entity.beforeRender();
    }

    private measureDeltaTime() {
        let now = performance.now();

        this.FrameCount += 1;
        this.DeltaTime = now - this.LastFrameTimeStamp;
        this.LastFrameTimeStamp = now;
    }

    private measureAverageFPS() {
        this.FrameCountInOneSecond += 1;
        this.AccumulatedTimeInOneSecond += this.DeltaTime;

        if (this.AccumulatedTimeInOneSecond >= 1000) {
            this.AccumulatedTimeInOneSecond -= 1000;
            this.FrameRate = this.FrameCountInOneSecond;
            this.FrameCountInOneSecond = 0;
        }      
    }
}

export { Engine };