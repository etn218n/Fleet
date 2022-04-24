import { Entity } from "./entity";

class Component {
    protected Owner:Entity;

    get hasOwner()  { return this.Owner !== undefined; }
    get transform() { return this.Owner.transform;     }

    public setOwnerEntity(onwer : Entity) {
        if (onwer === undefined)
            return;

        this.Owner = onwer;
    }

    public onStart() { }
    public onUpdate() { }
    public onLateUpdate()  { }
    public onFixedUpdate() { }
    public onBeforeRender() { }
}

export { Component };