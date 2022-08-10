//Singleton
let instance;

class Bank {
    constructor({ 
        bankCapital,
        name,
        infoBankAccount = [], // [{"id": "1234", "money": 500}]
    }) {
        if(instance) {
            throw new Error("You can only create one instance!");
        }
        instance = this;
        this.name = name;
        this.bankCapital = bankCapital;
        this.infoBankAccount = [{ quantityAccount: 0 }, infoBankAccount];
    }

    bankInformation() {
        const objectToArray = [this];
        return objectToArray;
    }

    addInfoBankAccount({id, nameClient, quantityMoney}) {
        const info = {id, nameClient, quantityMoney};
        this.infoBankAccount.push(info);
        this.incrementAccounts();
    }

    incrementAccounts () {
        this.infoBankAccount[0].quantityAccount++;
    }
}

const infoBank = {
    name: "Noith Bank",
    bankCapital: 20000,
};

const nicolasBank = Object.freeze(new Bank(infoBank));

module.exports = nicolasBank;