const logPurchaseReward = async (userId, points, criteria) => {
    await pool.query('INSERT INTO awards (user_id, reward_type, points, criteria, description) VALUES ($1, $2, $3, $4, $5)', 
    [userId, 'purchase', points, criteria, 'Reward for purchasing eco-friendly products']);
};
