const pool = require('../config/dataBs');

const updateProfile = async (userId, updates) => {
    const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = Object.values(updates);
    await pool.query(`UPDATE users SET ${fields} WHERE id = $${values.length + 1}`, [...values, userId]);
    return await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
};

module.exports = { updateProfile };
