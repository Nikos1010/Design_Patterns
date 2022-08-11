class BankAccount {
    constructor({ quantityMoney, nameClient, id }) {
        this.quantityMoney = quantityMoney;
        this.nameClient = nameClient;
        this.id = id;
    }

    quantityMoney() {
        return this.quantityMoney;
    }

    depositMoney(money) {
        return (this.quantityMoney += money);
    }
}

module.exports = BankAccount;