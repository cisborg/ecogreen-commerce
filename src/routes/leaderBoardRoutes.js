const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

// Route to get leaderboard for a specific squad
router.get('/leaderboards/squad/:squad_id', leaderboardController.getLeaderboard);

// Route to add or update a user's score
router.post('/leaderboards/scores', leaderboardController.upsertUserScore);

// Route to get all leaderboards
router.get('/leaderboards', leaderboardController.getAllLeaderboards);

// Route to calculate ranks
router.post('/leaderboards/ranks', leaderboardController.calculateRanks);

module.exports = router;


