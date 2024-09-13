const pool = require('../config/dataBs');

const getUserRankings = async () => {
    const result = await pool.query('SELECT username, green_points FROM users ORDER BY green_points DESC');
    return result.rows;
};

const getSquadRankings = async () => {
    const result = await pool.query('SELECT name, total_green_points FROM squads ORDER BY total_green_points DESC');
    return result.rows;
};

module.exports = { getUserRankings, getSquadRankings };
