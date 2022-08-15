class BankAccount {
    constructor({ client, id }) {
        this.client = client;
        this.id = id;
        this.accountMoney = 0;
        this.movementHistory = [];
    }
    #quantityMoney;

    getBalance() {
        return this.#quantityMoney;
    }

    setBalance(val) {
        this.#quantityMoney = val;
    }

    executeCommand(command) {
        this.accountMoney = command.execute(this.accountMoney);
        this.movementHistory.push(command);
    }

    undo() {
        const command = this.movementHistory.pop();
        this.accountMoney = command.undo(this.accountMoney);
    }
}

module.exports = BankAccount;