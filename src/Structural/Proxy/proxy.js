const ProxyClient = {
    set: (obj, prop, value) => {
        if (prop === "nameClient" && value.length < 2) {
            console.log(`You need to provide a valid name.`);
        } else if (prop === "identity" && value.length < 2) {
            console.log(`You need to provide a valid identity.`);
        } else if (prop === "typePerson") {
            if (value !== "Natural" || value !== "Juridica"){
                console.log(
                    `You need to provide a valid type person ('Natural' or 'Juridica').`
                );
            }
        } else {
            console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
            obj[prop] = value;
        }
    },

    get: (obj, prop) => {
        if (!obj[prop]) {
            console.log(
                `Hmm.. this property doesn't seem to exist on the target object`
            );
        } else {
            console.log(`The value of ${prop} is ${obj[prop]}`);
        }
    }
}

module.exports = ProxyClient;