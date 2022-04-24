import { Component } from "./component";
import { Transform } from "./transform";

type Constructor<T> = new (...args: any[]) => T;

class Entity {
    private Parent:Entity;
    private Transform:Transform = new Transform();
    private Components:Component[] = [];

    get transform() { return this.Transform; }

    public start() {
        for (const component of this.Components)
            component.onStart();
    }

    public update() {
        for (const component of this.Components)
            component.onUpdate();
    }

    public lateUpdate() {
        for (const component of this.Components)
            component.onLateUpdate();
    }

    public fixedUpdate() {
        for (const component of this.Components)
            component.onFixedUpdate();
    }

    public beforeRender() {
        for (const component of this.Components)
            component.onBeforeRender();
    }

    public addComponent(component : Component) {
        if (component.hasOwner)
            return;

        if (this.Components.includes(component))
            return;

        this.Components.push(component);
        component.setOwnerEntity(this);
    }

    public removeComponent(component : Component) {
        let index = this.Components.indexOf(component);
        if (index != -1)
            this.Components.splice(index, 1);
    }

    public getComponent<T extends Component>(instanceType: Constructor<T>) : T {
        return this.Components.find(component => component instanceof instanceType) as T;
    }

    public hasComponent<T extends Component>(instanceType: Constructor<T>) : boolean {
        return this.getComponent(instanceType) !== undefined;
    }
}

export { Entity };