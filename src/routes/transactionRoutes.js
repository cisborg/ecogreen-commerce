const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Get transactions by user ID
router.get('/user/:id', transactionController.getTransactionByUserId);

// Create new transaction
router.post('/', transactionController.createTransaction);

// Update transaction
router.put('/:id', transactionController.updateTransaction);

module.exports = router;
