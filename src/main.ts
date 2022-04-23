import * as Three from "three";
import * as Input from "./engine/input";
import { Engine } from "./engine/engine";
import { Scene } from "./engine/scene";
import { Entity } from "./engine/entity";
import { PerspectiveCamera } from "./engine/camera";
import { MeshRenderer } from "./engine/meshRenderer";

const engine = new Engine();
const scene  = new Scene();
const entity = new Entity();
const camera = new PerspectiveCamera(45, 1, 1, 1000);
camera.implementation.position.z = 5;

const meshRenderer    = new MeshRenderer();
meshRenderer.geometry = new Three.BoxGeometry();
meshRenderer.material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
meshRenderer.mesh     = new Three.Mesh(meshRenderer.geometry, meshRenderer.material);

entity.addComponent(meshRenderer);
entity.addComponent(camera);
scene.add(entity);

engine.createRenderCanvas(window.innerWidth, window.innerHeight);
engine.loadScene(scene);