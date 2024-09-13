// controllers/authController.js

const User = require('../models/User');
const { hashPassword, generateToken } = require('../helpers/authHelpers');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');

// Send OTP
const sendOtp = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    await User.update({ otp }, { where: { email } });
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    });
};

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password, referralCode } = req.body;
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ name, email, password: hashedPassword });

        // Send OTP for email verification
        await sendOtp(email);

        // Check if a referral code was used
        if (referralCode) {
            const referrer = await User.findOne({ where: { referralCode } });
            if (referrer) {
                const rewardPoints = 10; // Define how many points to reward
                referrer.points += rewardPoints;
                await referrer.save(); // Save updated referrer points
            }
        }

        const token = generateToken(newUser);
        res.status(201).json({ user: { id: newUser.id, email: newUser.email }, token });
    } catch (error) {
        res.status(400).json({ message: 'Registration failed', error: error.message });
    }
};

// Request Password Reset
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://yourapp.com/reset-password/${resetToken}`;
    await sendMail(user.email, 'Password Reset', `Reset your password using this link: ${resetLink}`);

    res.json({ message: 'Password reset link sent to your email' });
};

// Reset Password
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    const user = await User.findOne({ where: { resetToken: token, resetTokenExpiry: { [Op.gt]: Date.now() } } });

    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = await hashPassword(newPassword);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ message: 'Password has been reset successfully' });
};

// Verify Email
const verifyEmail = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({ where: { resetToken: token } });

    if (!user) {
        return res.status(400).json({ message: 'Invalid token' });
    }

    user.isVerified = true; // i have got an isVerified field
    user.resetToken = null;
    await user.save();

    res.json({ message: 'Email verified successfully' });
};

// Helper function to send email
const sendMail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    });
};

// Export all functions
module.exports = {
    registerUser,
    requestPasswordReset,
    resetPassword,
    verifyEmail,
    sendOtp,
};
