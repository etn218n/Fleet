import * as Input from "./engine/input";

function update() {
    Input.update();
    requestAnimationFrame(() => update());
}

update();