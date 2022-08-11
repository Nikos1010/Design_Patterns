class Client {
    constructor(
        nameClient,
        typePerson = "Natural",
        identity,
        cellphoneNumber,
        address
    ) {
        this.nameClient = nameClient;
        this.typePerson = typePerson;
        this.identity = identity;
        this.cellphoneNumber = cellphoneNumber;
        this.address = address;
    }

    setNameClient(nameClient) {
        this.nameClient = nameClient;
    }

    setTypePerson(typePerson) {
        this.typePerson = typePerson;
    }

    setIdentity(identity) {
        this.identity = identity;
    }
    
    setCellphoneNumber(cellphoneNumber) {
        this.cellphoneNumber = cellphoneNumber;
    }

    setAddress(address) {
        this.address = address;
    }
}

module.exports = Client;