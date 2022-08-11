const { Router } = require('express');
const { getInfoBank, getInfoBankAccount, getCards } = require("../controllers/bank.js");
const { getClients } = require('../controllers/client.js');

const router = Router();

router.get("/clients", getClients);

router.get("/cards", getCards);

router.get('/bankAccount', getInfoBankAccount);

router.get("/", getInfoBank);

module.exports = router;