class DepositMoney {
    constructor(valueToAdd) {
        this.valueToAdd = valueToAdd;
    }

    execute(currentValue) {
        return currentValue + this.valueToAdd;
    }

    undo (currentValue) {
        return currentValue - this.valueToAdd;
    }
}

class WithdrawMoney {
    constructor(valueToSubstract) {
        this.valueToSubstract = valueToSubstract;
    }

    execute(currentValue) {
        return currentValue - this.valueToSubstract;
    }

    undo(currentValue) {
        return currentValue + this.valueToSubstract;
    }
}

exports.DepositMoney = DepositMoney;
exports.WithdrawMoney = WithdrawMoney;