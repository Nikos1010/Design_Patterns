class BankAccount {
    constructor({ quantityMoney, client, id }) {
        this.quantityMoney = quantityMoney;
        this.client = client;
        this.id = id;
    }

    quantityMoney() {
        return this.quantityMoney;
    }

    depositMoney(money) {
        return (this.quantityMoney += money);
    }
}
