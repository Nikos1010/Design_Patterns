class CreditCard {
    constructor({ typeCard }) {
        this.typeCard = typeCard;
        this.amountOfMoneyInAccount = 0;
        this.amountOfMoneyOwed = 0;
    }

    withdrawCash(quantityCash) {
        if (quantityCash > this.amountOfMoneyInAccount) {
            const err = {
                msg: `You cannot withdraw that amount of money, ask for more money.`,
            };
            return err;
        } else {
            this.amountOfMoneyInAccount -= quantityCash;
        }
    }

    borrowingCash(quantityCash) {
        this.amountOfMoneyInAccount = quantityCash;
        this.amountOfMoneyOwed = Math.round(quantityCash * 1.15);
    }

    totalDebt() {
        return this.amountOfMoneyOwed;
    }

    totalMoneyinAccount() {
        return this.amountOfMoneyInAccount;
    }

    payCredit(money) {
        this.amountOfMoneyOwed -= money;
    }
}

class DebitCard {
    constructor({ typeCard }) {
        this.typeCard = typeCard;
        this.amountOfMoneyInAccount = 0;
    }

    withdrawCash(quantityCash) {
        if (quantityCash > this.amountOfMoneyInAccount) {
            const err = {
                msg: `You cannot withdraw that amount of money, ask for more money.`,
            };
            return err;
        } else {
            this.amountOfMoneyInAccount -= quantityCash;
        }
    }

    totalMoneyinAccount() {
        return this.amountOfMoneyInAccount;
    }
}

exports.DebitCard = DebitCard;
exports.CreditCard = CreditCard;