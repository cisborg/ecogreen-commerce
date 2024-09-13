const pool = require('../config/db');
const crypto = require('crypto');

const Referral = {
    generateReferralCode: () => {
        return crypto.randomBytes(4).toString('hex'); // Generates a unique code
    },
    addReferral: async (userId, code) => {
        const result = await pool.query('UPDATE users SET referrals_count = referrals_count + 1 WHERE referral_code = $1 RETURNING *', [code]);
        if (result.rows[0].referrals_count % 10 === 0) {
            await Reward.addReward(userId, 'PIZZA', 100);
        }
        return result.rows[0];
    },
    createUserWithReferral: async (username, password, referralCode) => {
        const referral = await pool.query('SELECT * FROM users WHERE referral_code = $1', [referralCode]);
        if (referral.rows.length > 0) {
            const newUser = await pool.query('INSERT INTO users (username, password, referral_code) VALUES ($1, $2, $3) RETURNING *', [username, password, referralCode]);
            await Referral.addReferral(referral.rows[0].id, referralCode); // Increment referral count
            return newUser.rows[0];
        }
        return null; // Referral code not found
    }
};

module.exports = Referral;
