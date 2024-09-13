const logDonationReward = async (userId, points, criteria) => {
    await pool.query('INSERT INTO awards (user_id, reward_type, points, criteria, description) VALUES ($1, $2, $3, $4, $5)', 
    [userId, 'donation', points, criteria, 'Reward for donating to disaster relief']);
};
