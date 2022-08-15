//Singleton
let instance;

class Bank {
    constructor({
        bankCapital,
        name,
        infoBankAccount = [], //  [{"id": "1234", "client": "{}"}]
    }) {
        if (instance) {
            throw new Error("You can only create one instance!");
        }
        instance = this;
        this.name = name;
        this.infoBank = {
            quantityAccount: 0,
            bankCapital: bankCapital,
        };
        this.infoBankAccount = infoBankAccount;
    }

    bankInformation() {
        const objectToArray = [this];
        return objectToArray;
    }

    addInfoBankAccount({ id, client }) {
        const info = { id, client };
        this.infoBankAccount.push(info);
        this.incrementAccounts();
    }

    incrementAccounts() {
        this.infoBank.quantityAccount++;
    }
}

const infoBank = {
    name: "Noith Bank",
    bankCapital: 20000,
};

const nicolasBank = Object.freeze(new Bank(infoBank));

module.exports = nicolasBank;