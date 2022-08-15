const { Router } = require('express');
const { getInfoBank, getInfoBankAccount, getCards, getObservers, getInfoMovements } = require("../controllers/bank.js");
const { getClients } = require('../controllers/client.js');

const router = Router();

router.get("/clients", getClients);

router.get("/cards", getCards);

router.get('/bankAccount', getInfoBankAccount);

router.get("/bankAccountObserver", getObservers);

router.get("/command", getInfoMovements);

router.get("/", getInfoBank);

module.exports = router;