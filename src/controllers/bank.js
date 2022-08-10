const Bank = require('../models/Singleton/Bank.js');
const { Generic } = require('./Exception.js');

exports.getInfoBank = (req, res) => {
    const bankInfo = Bank.bankInformation();
    Generic.notFoundElements(bankInfo, "Information ",res);
}

