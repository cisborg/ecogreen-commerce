const express = require('express');
const { sendOtp, sendEmailVerification } = require('../controllers/registrationController');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password, email, phoneNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random OTP
    await sendOtp(phoneNumber, otp);
    await sendEmailVerification(email, otp);
    // Store user temporarily until OTP is verified
    // Logic for storing the user and OTP goes here
    res.json({ message: 'OTP sent to your phone and email' });
});
