const {Router} = require('express');
const { getInfoBank } = require('../controllers/bank.js');

const router = Router();

router.get('/', getInfoBank)

module.exports = router;