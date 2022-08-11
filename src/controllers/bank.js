const BankAccount = require('../models/Prototype/BankAccount.js');
const Bank = require('../models/Singleton/Bank.js');
const { Generic } = require('./Exception.js');

exports.getInfoBank = (req, res) => {
    const bankInfo = Bank.bankInformation();
    Generic.notFoundElements(bankInfo, "Information ",res);
}

exports.getInfoBankAccount = (req, res) => {
    const bankAccountOne = new BankAccount({
        quantityMoney: 500,
        nameClient:  "Leosh",
        id: "1"
    });
    Bank.addInfoBankAccount(bankAccountOne);
    
    const bankAccountTwo = new BankAccount({
        quantityMoney: 800,
        nameClient: "Camil",
        id: "2"
    });
    Bank.addInfoBankAccount(bankAccountTwo);
    res.json(Bank.infoBankAccount);
}

