const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to register a new user
router.post('/register', authController.registerUser);

// Route to request password reset
router.post('/password-reset/request', authController.requestPasswordReset);

// Route to reset password
router.post('/password-reset', authController.resetPassword);

// Route to verify email
router.get('/verify-email/:token', authController.verifyEmail);

// Export the router
module.exports = router;
