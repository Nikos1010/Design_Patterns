const { Router } = require('express');
const { getInfoBank } = require("../controllers/bank.js");
const { postAddClient } = require('../controllers/client.js');

const router = Router();

router.get("/addclients", postAddClient);

router.get("/client/:id", /*getClient*/);

router.get("/clients", /*getClients*/);

router.get('/', getInfoBank);

module.exports = router;