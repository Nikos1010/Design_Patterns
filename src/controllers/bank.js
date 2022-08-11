const AbstractCardFactory = require('../models/Factory/AbstractFactory.js');
const Cardfactory = require('../models/Factory/Factory.js');
const BankAccount = require('../models/Prototype/BankAccount.js');
const { DebitCard, CreditCard } = require('../models/Prototype/Cards.js');
const Bank = require('../models/Singleton/Bank.js');

const { Generic } = require('./Exception.js');

exports.getInfoBank = (req, res) => {
    const bankInfo = Bank.bankInformation();
    Generic.notFoundElements(bankInfo, "Information ",res);
}

exports.getInfoBankAccount = (req, res) => {
    const cardFactory = new Cardfactory();

    const infoOne = {
        quantityMoney: 500,
        client: {
            name: "Leosh",
            typeCard: cardFactory.createCard({typeCard: 'Debit'}),
        },
        id: "1",
    };
    const bankAccountOne = new BankAccount(infoOne);
    Bank.addInfoBankAccount(bankAccountOne);
    
    const bankAccountTwo = new BankAccount({
        quantityMoney: 800,
        client: {
            name: "Camil",
            typeCard: cardFactory.createCard({ typeCard: "Credit" }),
        },
        id: "2",
    });
    Bank.addInfoBankAccount(bankAccountTwo);
    res.json(Bank.infoBankAccount);
}

exports.getCards = (req, res) => {
    const abstractCardFactory = new AbstractCardFactory();
    abstractCardFactory.registerCard("debit", DebitCard);
    abstractCardFactory.registerCard("credit", CreditCard);

    const debitCardOne = abstractCardFactory.getCard("debit", {
        typeCard: "Debit",
    });
    const creditCardOne = abstractCardFactory.getCard("credit", {
        typeCard: "Credit",
    });
    const allCards = [debitCardOne, creditCardOne];
    res.json(allCards);
}
