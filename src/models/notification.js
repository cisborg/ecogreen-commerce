const pool = require('../config/dataBs');

const Notification = {
    create: async (userId, message) => {
        const result = await pool.query('INSERT INTO notifications (user_id, message) VALUES ($1, $2) RETURNING *', 
            [userId, message]);
        return result.rows[0];
    },
    getAll: async (userId) => {
        const result = await pool.query('SELECT * FROM notifications WHERE user_id = $1', [userId]);
        return result.rows;
    }
};

module.exports = Notification;
