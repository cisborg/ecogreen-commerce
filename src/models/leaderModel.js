const db = require('../config/database');

class Leaderboard {
    // Get leaderboard for a specific squad
    static async getLeaderboardBySquadId(squad_id) {
        const result = await db.query('SELECT * FROM leaderboards WHERE squad_id = $1 ORDER BY points DESC', [squad_id]);
        return result.rows;
    }

    // Add or update a user's score
    static async upsertUserScore(user_id, squad_id, points, donations, activities) {
        const result = await db.query(
            `INSERT INTO leaderboards (user_id, squad_id, points, total_donations, total_successful_activities)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (user_id, squad_id) 
             DO UPDATE SET points = leaderboards.points + $3,
                           total_donations = leaderboards.total_donations + $4,
                           total_successful_activities = leaderboards.total_successful_activities + $5 
             RETURNING *`,
            [user_id, squad_id, points, donations, activities]
        );
        return result.rows[0];
    }

    // Get all leaderboards
    static async getAllLeaderboards() {
        const result = await db.query('SELECT * FROM leaderboards ORDER BY points DESC');
        return result.rows;
    }

    // Calculate ranks based on points
    static async calculateRanks() {
        const result = await db.query(`
            WITH ranked AS (
                SELECT *,
                       ROW_NUMBER() OVER (ORDER BY points DESC) AS rank
                FROM leaderboards
            )
            UPDATE leaderboards
            SET rank = ranked.rank
            FROM ranked
            WHERE leaderboards.user_id = ranked.user_id AND leaderboards.squad_id = ranked.squad_id
            RETURNING leaderboards.*;
        `);
        return result.rows;
    }
}

module.exports = Leaderboard;
