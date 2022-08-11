const { Router } = require('express');
const { getInfoBank, getInfoBankAccount, getCards } = require("../controllers/bank.js");
const { postAddClient } = require('../controllers/client.js');

const router = Router();

router.get("/addclients", postAddClient);

router.get("/client/:id", /*getClient*/);

router.get("/cards", getCards);

router.get('/bankAccount', getInfoBankAccount);

router.get("/", getInfoBank);

module.exports = router;