const { ObserverList } = require('./ObserverList.js');

class Subject {
    constructor() {
        this.observers = new ObserverList();
    }

    addObserver(observer) {
        this.observers.add(observer);
    }

    removeObserver(observer) {
        this.observers.removeAt(this.observers.indexOf(observer, 0));
    }

    notify(context) {
        this.observers.observerList.forEach((_, index) => {
            this.observers.get(index).notify(context);
        });
    }
}

module.exports = Subject;

