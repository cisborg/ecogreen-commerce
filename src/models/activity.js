const pool = require('../config/dataBs');

const Activity = {
    create: async (userId, title, description, points) => {
        const result = await pool.query('INSERT INTO activities (user_id, title, description, points) VALUES ($1, $2, $3, $4) RETURNING *', 
            [userId, title, description, points]);
        return result.rows[0];
    },
    getAll: async (userId) => {
        const result = await pool.query('SELECT * FROM activities WHERE user_id = $1', [userId]);
        return result.rows;
    },
    complete: async (activityId) => {
        const result = await pool.query('UPDATE activities SET completed = TRUE WHERE id = $1 RETURNING *', [activityId]);
        return result.rows[0];
    }
};

module.exports = Activity;
