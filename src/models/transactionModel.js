const database = require('../config/database');

class Transaction {
    constructor(transaction_id, user_id, product_id, points_used, payment_method, amount_in_kes, status, transaction_date) {
        this.transaction_id = transaction_id;
        this.user_id = user_id;
        this.product_id = product_id;
        this.points_used = points_used;
        this.payment_method = payment_method;
        this.amount_in_kes = amount_in_kes;
        this.status = status;
        this.transaction_date = transaction_date || new Date();
    }

    static async getByUserId(user_id) {
        try {
            const result = await database.query('SELECT * FROM transactions WHERE user_id = $1', [user_id]);
            return result.rows;
        } catch (err) {
            throw new Error('Database connection error');
        }
    }

    static async create(transactionData) {
        const { user_id, product_id, points_used, payment_method, amount_in_kes, status } = transactionData;

        try {
            const result = await database.query(
                'INSERT INTO transactions (user_id, product_id, points_used, payment_method, amount_in_kes, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [user_id, product_id, points_used, payment_method, amount_in_kes, status || 'incomplete']
            );
            return result.rows[0];
        } catch (error) {
            throw new Error('Database error');
        }
    }

    static async update(transaction_id, transactionData) {
        const { user_id, product_id, points_used, payment_method, amount_in_kes, status } = transactionData;

        try {
            const result = await database.query(
                'UPDATE transactions SET user_id = $1, product_id = $2, points_used = $3, payment_method = $4, amount_in_kes = $5, status = $6 WHERE transaction_id = $7 RETURNING *',
                [user_id, product_id, points_used, payment_method, amount_in_kes, status, transaction_id]
            );

            if (result.rowCount === 0) {
                throw new Error('Transaction not found');
            }
            return result.rows[0];
        } catch (error) {
            throw new Error('Database error');
        }
    }
}

module.exports = Transaction;
