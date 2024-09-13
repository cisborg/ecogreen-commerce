const db = require('../config/database');

class FocusValueChain {
    // Update the percentage achieved for a specific activity
    static async updatePercentageAchieved(fvc_id, percentage_achieved) {
        const result = await db.query(
            `UPDATE focus_value_chain SET percentage_achieved = $1, updated_at = CURRENT_TIMESTAMP 
             WHERE fvc_id = $2 RETURNING *`,
            [percentage_achieved, fvc_id]
        );
        return result.rows[0];
    }

    // Get all focus value chain activities for a specific squad
    static async getSquadFocusValueChain(squad_id) {
        const result = await db.query(
            `SELECT * FROM focus_value_chain WHERE squad_id = $1 ORDER BY fvc_id`,
            [squad_id]
        );
        return result.rows;
    }

    // Get all focus value chain activities
    static async getAllFocusValueChains() {
        const result = await db.query('SELECT * FROM focus_value_chain ORDER BY fvc_id');
        return result.rows;
    }
}

module.exports = FocusValueChain;
