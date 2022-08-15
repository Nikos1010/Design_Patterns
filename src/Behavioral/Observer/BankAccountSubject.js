const Subject = require("./Subject");

class BankAccountSubject extends Subject {
    constructor({ client, id }) {
        super();
        this.client = client;
        this.id = id;
    }
    #quantityMoney;

    getBalance() {
        return this.#quantityMoney;
    }

    setBalance(val) {
        this.notify("money was changed");
        this.#quantityMoney = val;
    }

    depositMoney(money) {
        this.notify("money was deposited");
        return (this.#quantityMoney += money);
    }

    notify(context) {
        super.notify(context);
    }
}

module.exports = BankAccountSubject;
