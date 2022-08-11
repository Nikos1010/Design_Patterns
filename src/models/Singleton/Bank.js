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
        this.infoBank = { 
            quantityAccount: 0, 
            bankCapital: bankCapital 
        };
        this.infoBankAccount = infoBankAccount;
    }

    bankInformation() {
        const objectToArray = [this];
        return objectToArray;
    }

    addInfoBankAccount({id, client, quantityMoney}) {
        const info = { id, client, quantityMoney };
        this.infoBankAccount.push(info);
        this.incrementAccountsAndCapital(quantityMoney);
    }

    incrementAccountsAndCapital (money) {
        this.infoBank.quantityAccount++;
        this.infoBank.bankCapital += money;
    }
}

const infoBank = {
    name: "Noith Bank",
    bankCapital: 20000,
};

const nicolasBank = Object.freeze(new Bank(infoBank));

module.exports = nicolasBank;