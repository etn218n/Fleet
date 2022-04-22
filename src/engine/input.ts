import { Mouse } from "./mouse";
import { Keyboard } from "./keyboard";

const mouse:Mouse       = new Mouse();
const keyboard:Keyboard = new Keyboard();

function update() {
    mouse.update();
    keyboard.update();
}

export { update, mouse, keyboard };