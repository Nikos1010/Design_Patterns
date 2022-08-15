class BankAccount {
    constructor({ client, id }) {
        this.client = client;
        this.id = id;
    }
    #quantityMoney;

    getBalance() {
        return this.#quantityMoney;
    }

    setBalance(val) {
        this.#quantityMoney = val;
    }

    depositMoney(money) {
        return (this.#quantityMoney += money);
    }
}

module.exports = BankAccount;