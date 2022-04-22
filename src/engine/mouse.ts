import { Event } from "./event";
import { ButtonState } from "./buttonState";

class Mouse {
    private UpdatedButtons:number[]    = [];
    private MouseStates:ButtonState[]  = [];
    private ButtonHoldThreshold:number = 200;

    private ScreenX:number;
    private ScreenY:number;
    private PositionX:number;
    private PositionY:number;
    private MovementX:number;
    private MovementY:number;
    private WheelDelta:number;

    private OnButtonDown:Event     = new Event();
    private OnButtonHold:Event     = new Event();
    private OnButtonPressed:Event  = new Event();
    private OnButtonReleased:Event = new Event();

    get left()   { return this.MouseStates[0]; }
    get middle() { return this.MouseStates[1]; }
    get right()  { return this.MouseStates[2]; }
    get extra1() { return this.MouseStates[3]; }
    get extra2() { return this.MouseStates[4]; }

    get screenX()    { return this.ScreenX;    }
    get screenY()    { return this.ScreenY;    }
    get positionX()  { return this.PositionX;  }
    get positionY()  { return this.PositionY;  }
    get movementX()  { return this.MovementX;  }
    get movementY()  { return this.MovementY;  }
    get wheelDelta() { return this.WheelDelta; }

    get onButtonDown()     { return this.OnButtonDown;     };
    get onButtonHold()     { return this.OnButtonHold;     };
    get onButtonPressed()  { return this.OnButtonPressed;  };
    get onButtonReleased() { return this.OnButtonReleased; };

    constructor() {
        this.initializeEvents();
        this.initializeKeyboardStates();
    }

    public update() {
        for (let i = this.UpdatedButtons.length - 1; i >= 0; i--) {
            let button      = this.UpdatedButtons[i];
            let buttonState = this.MouseStates[button];
    
            buttonState.update();
    
            if (buttonState.isDown)
                this.onButtonDown.notify();
    
            if (buttonState.isPressed)
                this.onButtonDown.notify();
    
            if (buttonState.isHold)
                this.onButtonHold.notify(buttonState.holdDuration);
    
            if (buttonState.isReleased)
                this.onButtonReleased.notify();
    
            if (buttonState.isDone)
                this.UpdatedButtons.splice(i, 1);
        }
    }

    private initializeEvents() {
        window.addEventListener("mousedown", e => {
            this.MouseStates[e.button].setButtonDown();
            if (!this.UpdatedButtons.includes(e.button))
                this.UpdatedButtons.push(e.button);
        });
        
        window.addEventListener("mouseup", e => {
            this.MouseStates[e.button].setButtonUp();
        });
        
        window.addEventListener("mousemove", e => {
            this.ScreenX   = e.screenX;
            this.ScreenY   = e.screenY;
            this.PositionX = e.offsetX;
            this.PositionY = e.offsetY;
            this.MovementX = e.movementX;
            this.MovementY = e.movementY;
        });
        
        window.addEventListener("wheel", e => {
            this.WheelDelta = e.deltaY;
        });
    }

    public initializeKeyboardStates() {
        this.MouseStates[0] = new ButtonState(this.ButtonHoldThreshold);
        this.MouseStates[1] = new ButtonState(this.ButtonHoldThreshold);
        this.MouseStates[2] = new ButtonState(this.ButtonHoldThreshold);
        this.MouseStates[3] = new ButtonState(this.ButtonHoldThreshold);
        this.MouseStates[4] = new ButtonState(this.ButtonHoldThreshold);
    }
}

export { Mouse };