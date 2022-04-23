import { Entity } from "./entity";

class Component {
    protected OwnerEntity:Entity;

    public onStart() { }
    public onUpdate() { }
    public onLateUpdate()  { }
    public onFixedUpdate() { }
}

export { Component };