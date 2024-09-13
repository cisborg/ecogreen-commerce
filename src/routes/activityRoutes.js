const express = require('express');
const router = express.Router();
const { calculateProgress } = require('../controllers/progressController');

// Route to calculate progress for a specific user
router.get('/:userId/progress', async (req, res) => {
    try {
        const { userId } = req.params;
        const progress = await calculateProgress(userId);
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate progress' });
    }
});

module.exports = router;
