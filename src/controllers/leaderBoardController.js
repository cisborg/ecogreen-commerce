const Leaderboard = require('../models/leaderboardModel');

// Get leaderboard for a specific squad
exports.getLeaderboard = async (req, res) => {
    const squad_id = parseInt(req.params.squad_id);
    try {
        const leaderboard = await Leaderboard.getLeaderboardBySquadId(squad_id);
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Add or update a user's score
exports.upsertUserScore = async (req, res) => {
    const { user_id, squad_id, points, donations, activities } = req.body;
    try {
        const updatedScore = await Leaderboard.upsertUserScore(user_id, squad_id, points, donations, activities);
        res.status(200).json(updatedScore);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Get all leaderboards
exports.getAllLeaderboards = async (req, res) => {
    try {
        const leaderboards = await Leaderboard.getAllLeaderboards();
        res.json(leaderboards);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Calculate ranks
exports.calculateRanks = async (req, res) => {
    try {
        const updatedRanks = await Leaderboard.calculateRanks();
        res.json(updatedRanks);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};
