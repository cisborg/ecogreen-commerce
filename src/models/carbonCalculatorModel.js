const db = require('../config/database');

class CarbonCalculator {
    // Add or update carbon calculator entry
    static async upsertCalculator(squad_id, carbon_footprint, threshold, badge_earned) {
        const result = await db.query(
            `INSERT INTO carbon_calculator (squad_id, carbon_footprint, threshold, badge_earned)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (squad_id) 
             DO UPDATE SET carbon_footprint = excluded.carbon_footprint,
                           threshold = excluded.threshold,
                           badge_earned = excluded.badge_earned
             RETURNING *`,
            [squad_id, carbon_footprint, threshold, badge_earned]
        );
        return result.rows[0];
    }

    // Get carbon calculator data for a specific squad
    static async getCalculatorData(squad_id) {
        const result = await db.query(
            'SELECT * FROM carbon_calculator WHERE squad_id = $1,'
            [squad_id]
        );
        return result.rows[0];
    }

    // Calculate thresholds and aggregates for activities, donations, and purchases
    static async calculateAggregates(squad_id) {
        // This is a placeholder for the actual calculation logic
        // You will need to implement the logic to calculate thresholds based on activities, donations, and purchases
        // Example SQL might look something like:
        const result = await db.query(`
            SELECT SUM(carbon_footprint) AS total_footprint,
                   SUM(threshold) AS total_threshold
            FROM carbon_calculator
            WHERE squad_id = $1
        `, [squad_id]);
        return result.rows[0];
    }
}

module.exports = CarbonCalculator;

