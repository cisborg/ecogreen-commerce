const pool = require('../config/dataBs');

const checkAwards = async (userId) => {
    const userResult = await pool.query('SELECT green_points FROM users WHERE id = $1', [userId]);
    const userPoints = userResult.rows[0].green_points;

    const awardsResult = await pool.query('SELECT * FROM awards WHERE criteria <= $1', [userPoints]);
    return awardsResult.rows;
};

module.exports = { checkAwards };
