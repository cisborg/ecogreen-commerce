const express = require('express');
const { updateProfile } = require('../controllers/profileController');
const router = express.Router();

// Update user profile
router.patch('/:userId', async (req, res) => {
    const updatedUser = await updateProfile(req.params.userId, req.body);
    res.json(updatedUser.rows[0]);
});

module.exports = router;
