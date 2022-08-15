const { DepositMoney, WithdrawMoney } = require('../Behavioral/Command/Command.js');
const BankAccountSubject = require('../Behavioral/Observer/BankAccountSubject.js');
const { Observer } = require('../Behavioral/Observer/ObserverList.js');
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
        client: {
            name: "Leosh",
            typeCard: cardFactory.createCard({typeCard: 'Debit'}),
        },
        id: "1",
    };
    const bankAccountOne = new BankAccount(infoOne);
    bankAccountOne.setBalance(500);
    Bank.addInfoBankAccount(bankAccountOne);
    
    const bankAccountTwo = new BankAccount({
        client: {
            name: "Camila",
            typeCard: cardFactory.createCard({ typeCard: "Credit" }),
        },
        id: "2",
    });
    bankAccountTwo.setBalance(800);
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

exports.getObservers = (req, res) => {
    const cardFactory = new Cardfactory();

    const bankAccountThree = new BankAccountSubject({
        client: {
            name: "Uver",
            typeCard: cardFactory.createCard({ typeCard: "Credit" }),
        },
        id: "2",
    });
    const observerOne = new Observer();
    const observerTwo = new Observer();
    const observerThree = new Observer();
    bankAccountThree.addObserver(observerOne);
    bankAccountThree.addObserver(observerTwo);
    bankAccountThree.addObserver(observerThree);

    bankAccountThree.setBalance(500);
    bankAccountThree.depositMoney(300);

    const bankAccountFour = new BankAccountSubject({
        client: {
            name: "June",
            typeCard: cardFactory.createCard({ typeCard: "Debit" }),
        },
        id: "2",
    });
    const observerFour = new Observer();
    const observerFive = new Observer();
    bankAccountFour.addObserver(observerFour);
    bankAccountFour.addObserver(observerFive);
    bankAccountFour.addObserver(observerThree);

    bankAccountFour.setBalance(1000);
    bankAccountFour.depositMoney(200);

    const allBankAccount = [bankAccountThree.client, bankAccountFour.client];

    res.json(allBankAccount);
}

exports.getInfoMovements = (req, res) => {
    const Noith = new BankAccount({
        client: {
            name: "Uver",
        },
        id: "2",
    });
    Noith.executeCommand(new DepositMoney(500));
    Noith.executeCommand(new WithdrawMoney(100));
    console.log(Noith);
    Noith.undo();
    console.log(Noith);
    res.json(Noith);
}