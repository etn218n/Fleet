import { Component } from "./component";
import { Vector3, Quaternion } from "three";

type Constructor<T> = new (...args: any[]) => T;

class Entity {
    private Parent:Entity;
    private Position:Vector3 = new Vector3(0, 0, 0);
    private Components:Component[] = [];

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

    public addComponent(component : Component) {
        if (!this.Components.includes(component))
            this.Components.push(component);
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