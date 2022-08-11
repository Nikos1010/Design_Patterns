const Client = require('../Prototype/Client.js');

class ClientBuilder {
    constructor() {
        this.client = new Client();
    }

    withNameClient(nameClient) {
        this.client.setNameClient(nameClient);
        return this;
    }

    withTypePerson(typePerson) {
        this.client.setTypePerson(typePerson);
        return this;
    }

    withIdentity(identity) {
        this.client.setIdentity(identity);
        return this;
    }

    withCellphoneNumber(cellphoneNumber) {
        this.client.setCellphoneNumber(cellphoneNumber);
        return this;
    }

    withAddress(address) {
        this.client.setAddress(address);
        return this;
    }

    build() {
        return this.client;
    }
}

module.exports = ClientBuilder;