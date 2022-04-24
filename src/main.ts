import * as Three from "three";
import * as Nol from "./nol";
import { Motor } from "./motor";

const engine = new Nol.Engine();
const scene  = new Nol.Scene();
const camera = new Nol.Entity();
const cube   = new Nol.Entity();
const motor  = new Motor();

const meshRenderer    = new Nol.MeshRenderer();
meshRenderer.geometry = new Three.BoxGeometry();
meshRenderer.material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
meshRenderer.mesh     = new Three.Mesh(meshRenderer.geometry, meshRenderer.material);

cube.addComponent(meshRenderer);
cube.addComponent(motor);
camera.addComponent(new Nol.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
scene.add(camera);
scene.add(cube);

camera.transform.position = new Nol.Vector3(0, 0, 10);

engine.createRenderCanvas(window.innerWidth, window.innerHeight);
engine.loadScene(scene);