const db = require('../config/database');

class QuickAction {
    // Create a new quick action with a transaction reference
    static async createQuickAction(user_id, action_type, action_details, transaction_id) {
        const result = await db.query(
            `INSERT INTO quick_actions (user_id, action_type, action_details, transaction_id)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [user_id, action_type, action_details, transaction_id]
        );
        return result.rows[0];
    }

    // Get all quick actions for a user
    static async getUserQuickActions(user_id) {
        const result = await db.query('SELECT * FROM quick_actions WHERE user_id = $1 ORDER BY date DESC', [user_id]);
        return result.rows;
    }

    // Update the status of a quick action
    static async updateQuickActionStatus(action_id, action_status) {
        const result = await db.query(
            `UPDATE quick_actions SET action_status = $1 WHERE action_id = $2 RETURNING *`,
            [action_status, action_id]
        );
        return result.rows[0];
    }

    // Get all quick actions
    static async getAllQuickActions() {
        const result = await db.query('SELECT * FROM quick_actions ORDER BY date DESC');
        return result.rows;
    }
}

module.exports = QuickAction;
