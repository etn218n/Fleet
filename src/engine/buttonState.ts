import { Event } from "./event";

class ButtonState {
    private IsUp:boolean        = true;
    private IsDown:boolean      = false;
    private IsHold:boolean      = false;
    private IsPressed:boolean   = false;
    private IsReleased:boolean  = false;
    private IsDone:boolean      = false;
    private PressFlag:boolean   = false;
    private ReleaseFlag:boolean = false;
    
    private HoldDuration:number        = 0;
    private ButtonHoldThreshold:number = 0;
    private ButtonDownTimeStamp:number = 0;

    private OnDown:Event     = new Event();
    private OnHold:Event     = new Event();
    private OnPressed:Event  = new Event();
    private OnReleased:Event = new Event();

    get isUp ()        { return this.IsUp;         }
    get isDown()       { return this.IsDown;       }
    get isHold()       { return this.IsHold;       }
    get isPressed()    { return this.IsPressed;    }
    get isReleased()   { return this.IsReleased;   }
    get isDone()       { return this.IsDone;       }
    get holdDuration() { return this.HoldDuration; }
    
    get onDown()       { return this.OnDown;       }
    get onHold()       { return this.OnHold;       }
    get onPressed()    { return this.OnPressed;    }
    get onReleased()   { return this.OnReleased;   }
    
    constructor(buttonHoldThreshold) {
        this.ButtonHoldThreshold = buttonHoldThreshold;
    }

    public setButtonDown() {
        if (this.IsDown)
            return;

        this.IsUp = false;
        this.IsDown = true;
        this.IsDone = false;
        this.PressFlag = true;
        this.ButtonDownTimeStamp = performance.now();
    }

    public setButtonUp() {
        this.IsUp = true;
        this.IsDown = false;
        this.ReleaseFlag = true;
    }
    
    public update() {
        if (this.IsDown) {
            this.handleButtonPress();
            this.handleButtonHold();
            this.OnDown.notify();
        } 
        else {
            this.handleButtonRelease();
        }
    }
    
    private handleButtonPress() {
        if (this.PressFlag === true) {
            this.IsPressed = true;
            this.PressFlag = false;
            this.OnPressed.notify();
        }
        else {
            this.IsPressed = false;
        }
    }

    private handleButtonHold() {
        let buttonDownTime = performance.now() - this.ButtonDownTimeStamp;
        if (buttonDownTime > this.ButtonHoldThreshold) {
            this.IsHold       = true;
            this.HoldDuration = buttonDownTime - this.ButtonHoldThreshold;
            this.OnHold.notify(this.HoldDuration);
        }
    }

    private handleButtonRelease() {
        if (this.ReleaseFlag === true) {
            this.IsReleased  = true;
            this.ReleaseFlag = false;
            this.OnReleased.notify();
        }
        else {
            this.IsDone       = true;
            this.IsReleased   = false;
            this.IsHold       = false;
            this.HoldDuration = 0;
        }
    }
}

export { ButtonState };