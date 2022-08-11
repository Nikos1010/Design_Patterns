const { DebitCard, CreditCard } = require('../Prototype/Cards.js');

class Cardfactory {
    constructor() {
        this.cardClass = DebitCard;
    }

    createCard (options) {
        switch(options.typeCard) {
            case "Credit":
                this.cardClass = CreditCard;
                break;
            case "Debit":
                this.cardClass = DebitCard;
                break;
        }

        return new this.cardClass(options);
    }

}

module.exports = Cardfactory;