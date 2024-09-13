const Transaction = require('../models/transactionModel');

// Get transactions by user ID
exports.getTransactionByUserId = async (req, res) => {
    const user_id = parseInt(req.params.id);

    try {
        const transactions = await Transaction.getByUserId(user_id);
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new transaction
exports.createTransaction = async (req, res) => {
    const transactionData = req.body;

    try {
        const newTransaction = await Transaction.create(transactionData);
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
    const transaction_id = parseInt(req.params.id); // Assuming ID is passed in URL
    const transactionData = req.body;

    try {
        const updatedTransaction = await Transaction.update(transaction_id, transactionData);
        res.json(updatedTransaction);
    } catch (error) {
        if (error.message === 'Transaction not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};
