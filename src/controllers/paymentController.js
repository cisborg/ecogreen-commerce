const { processPayment } = require('../models/payment');

const depositMoney = (req, res) => {
    const { userId, amount, paymentMethod } = req.body;
    const paymentResult = processPayment(userId, amount, paymentMethod);
    res.json(paymentResult);
};

module.exports = { depositMoney };
