import { Event } from "./event";
import { ButtonState } from "./buttonState";

class Keyboard {
    private UpdatedKeys:string[]         = [];
    private KeyboardStates:ButtonState[] = [];
    private KeyHoldThreshold:number      = 200;

    private OnKeyDown:Event     = new Event();
    private OnKeyHold:Event     = new Event();
    private OnKeyPressed:Event  = new Event();
    private OnKeyReleased:Event = new Event();

    get onKeyDown()     { return this.OnKeyDown;     }
    get onKeyHold()     { return this.OnKeyHold;     }
    get onKeyPressed()  { return this.OnKeyPressed;  }
    get onKeyReleased() { return this.OnKeyReleased; }

    constructor() {
        this.initializeEvents();
        this.initializeKeyboardStates();
    }

    public update() {
        for (let i = this.UpdatedKeys.length - 1; i >= 0; i--) {
            let key      = this.UpdatedKeys[i];
            let keyState = this.KeyboardStates[key];
    
            keyState.update();
    
            if (keyState.isDown)
                this.OnKeyDown.notify();
    
            if (keyState.isPressed)
                this.OnKeyPressed.notify();
    
            if (keyState.isHold)
                this.OnKeyHold.notify(keyState.holdDuration);
    
            if (keyState.isReleased)
                this.OnKeyReleased.notify();
    
            if (keyState.isDone)
                this.UpdatedKeys.splice(i, 1);
        }
    }

    private initializeEvents() {
        window.addEventListener("keydown", e => {
            this.KeyboardStates[e.key].setButtonDown();
            if (!this.UpdatedKeys.includes(e.key))
                this.UpdatedKeys.push(e.key);
        });
        
        window.addEventListener("keyup", e => {
            this.KeyboardStates[e.key].setButtonUp();
        });
    }

    private initializeKeyboardStates() {
        this.KeyboardStates["0"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["1"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["2"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["3"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["4"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["5"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["6"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["7"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["8"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["9"] = new ButtonState(this.KeyHoldThreshold);

        this.KeyboardStates["a"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["b"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["c"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["d"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["e"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["f"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["g"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["h"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["i"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["j"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["k"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["l"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["m"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["n"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["o"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["p"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["q"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["r"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["s"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["t"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["u"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["v"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["w"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["x"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["y"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["z"] = new ButtonState(this.KeyHoldThreshold);

        this.KeyboardStates["["]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["]"]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates[":"]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates[";"]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["'"]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["/"]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates[","]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["."]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["\\"] = new ButtonState(this.KeyHoldThreshold);

        this.KeyboardStates["F1"]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["F2"]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["F3"]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["F4"]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["F5"]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["F6"]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["F7"]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["F8"]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["F9"]  = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["F10"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["F11"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["F12"] = new ButtonState(this.KeyHoldThreshold);

        this.KeyboardStates["Enter"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["Shift"] = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates[" "]     = new ButtonState(this.KeyHoldThreshold);
        this.KeyboardStates["Tab"]   = new ButtonState(this.KeyHoldThreshold);
    }

    get alpha0() { return this.KeyboardStates["0"]; }
    get alpha1() { return this.KeyboardStates["1"]; }
    get alpha2() { return this.KeyboardStates["2"]; }
    get alpha3() { return this.KeyboardStates["3"]; }
    get alpha4() { return this.KeyboardStates["4"]; }
    get alpha5() { return this.KeyboardStates["5"]; }
    get alpha6() { return this.KeyboardStates["6"]; }
    get alpha7() { return this.KeyboardStates["7"]; }
    get alpha8() { return this.KeyboardStates["8"]; }
    get alpha9() { return this.KeyboardStates["9"]; }

    get a() { return this.KeyboardStates["a"]; }
    get b() { return this.KeyboardStates["b"]; }
    get c() { return this.KeyboardStates["c"]; }
    get d() { return this.KeyboardStates["d"]; }
    get e() { return this.KeyboardStates["e"]; }
    get f() { return this.KeyboardStates["f"]; }
    get g() { return this.KeyboardStates["j"]; }
    get h() { return this.KeyboardStates["f"]; }
    get i() { return this.KeyboardStates["i"]; }
    get j() { return this.KeyboardStates["j"]; }
    get k() { return this.KeyboardStates["k"]; }
    get l() { return this.KeyboardStates["l"]; }
    get m() { return this.KeyboardStates["m"]; }
    get n() { return this.KeyboardStates["n"]; }
    get o() { return this.KeyboardStates["o"]; }
    get p() { return this.KeyboardStates["p"]; }
    get q() { return this.KeyboardStates["q"]; }
    get r() { return this.KeyboardStates["r"]; }
    get s() { return this.KeyboardStates["s"]; }
    get t() { return this.KeyboardStates["t"]; }
    get u() { return this.KeyboardStates["u"]; }
    get v() { return this.KeyboardStates["v"]; }
    get w() { return this.KeyboardStates["w"]; }
    get x() { return this.KeyboardStates["x"]; }
    get y() { return this.KeyboardStates["y"]; }
    get z() { return this.KeyboardStates["z"]; }

    get enter() { return this.KeyboardStates["Enter"]; }
    get shift() { return this.KeyboardStates["Shift"]; }
    get space() { return this.KeyboardStates[" "];     }
    get tab()   { return this.KeyboardStates["Tab"];   }
}

export { Keyboard };