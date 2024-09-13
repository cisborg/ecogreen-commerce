const express = require('express');
const Referral = require('../models/referral');
const router = express.Router();

// Generate referral code for the user
router.post('/generate', async (req, res) => {
    const { userId } = req.body;
    const code = Referral.generateReferralCode();
    await pool.query('UPDATE users SET referral_code = $1 WHERE id = $2', [code, userId]);
    res.json({ referral_code: code });
});

// Register a new user with a referral code
router.post('/register', async (req, res) => {
    const { username, password, referralCode } = req.body;
    const newUser = await Referral.createUserWithReferral(username, password, referralCode);
    if (newUser) {
        res.status(201).json(newUser);
    } else {
        res.status(400).json({ message: 'Invalid referral code' });
    }
});

module.exports = router;
