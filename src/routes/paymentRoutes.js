const express = require('express');
const { depositMoney } = require('../controllers/paymentController');
const router = express.Router();

router.post('/deposit', depositMoney);

module.exports = router;
