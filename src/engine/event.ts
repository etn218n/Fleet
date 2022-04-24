type Subscriber = (...args : any[]) => void; 

class Event {
    private Subscribers:Subscriber[]  = [];

    public subscribe(subscriber : Subscriber) {
        if (!this.Subscribers.includes(subscriber))
            this.Subscribers.push(subscriber);
    }

    public unsubscribe(subscriber : Subscriber) {
        let index = this.Subscribers.indexOf(subscriber);
        if (index !== -1)
            this.Subscribers.splice(index);
    }

    public notify(...args : any[]) {
        for (const subscriber of this.Subscribers)
            subscriber(args);
    }
}

export { Event, Subscriber };