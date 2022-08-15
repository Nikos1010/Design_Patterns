class ObserverList {
    constructor() {
        this.observerList = [];
    }

    add(obj) {
        return this.observerList.push(obj);
    }

    count() {
        return this.observerList.length;
    }

    get(index) {
        if(index > -1) {
            return this.observerList[index];
        }
    }

    indexOf(obj) {
        this.observerList.forEach((observer, index) => {
            if(observer === obj){
                return index;
            }
        });
        return -1;
    }

    removeAt(index) {
        this.observerList.splice(index, 1);
    }
}

class Observer {    
    notify(subject){
        console.log(`Cambio: ${subject}`);
    }
}

exports.ObserverList = ObserverList;
exports.Observer = Observer;