const Bank = require('../models/Singleton/Bank.js');
const { Generic } = require('./Exception.js');

exports.getInfoBank = (req, res) => {
    const bankInfo = Bank.bankInformation();
    Bank.addInfoBankAccount({ id: '123', nameClient: 'Nicolas', quantityMoney: 500 });
    Generic.notFoundElements(bankInfo, "Information ",res);
}

