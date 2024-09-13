const db = require('../config/database');

class Donation {
    // Get donations by user ID
    static async getByUserId(userId) {
        const result = await db.query('SELECT * FROM donations WHERE user_id = $1', [userId]);
        return result.rows;
    }

    // Create a new donation
    static async create(user_id, points_donated, cause) {
        const result = await db.query(
            'INSERT INTO donations (user_id, points_donated, cause) VALUES ($1, $2, $3) RETURNING *',
            [user_id, points_donated, cause]
        );
        return result.rows[0];
    }

    // Update donation
    static async update(donation_id, points_donated, cause) {
        const result = await db.query(
            'UPDATE donations SET points_donated = $1, cause = $2 WHERE donation_id = $3 RETURNING *',
            [points_donated, cause, donation_id]
        );
        if (result.rowCount === 0) {
            throw new Error('Donation not found');
        }
        return result.rows[0];
    }

    // Delete donation by ID
    static async delete(donation_id) {
        const result = await db.query('DELETE FROM donations WHERE donation_id = $1', [donation_id]);
        if (result.rowCount === 0) {
            throw new Error('Donation not found');
        }
    }
}

module.exports = Donation;
