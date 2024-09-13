const FocusValueChain = require('../models/focusValueChainModel');

// Update the percentage achieved for a specific activity
exports.updatePercentageAchieved = async (req, res) => {
    const { fvc_id, percentage_achieved } = req.body;
    try {
        const updatedActivity = await FocusValueChain.updatePercentageAchieved(fvc_id, percentage_achieved);
        res.json(updatedActivity);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Get all focus value chain activities for a specific squad
exports.getSquadFocusValueChain = async (req, res) => {
    const squad_id = parseInt(req.params.squad_id);
    try {
        const activities = await FocusValueChain.getSquadFocusValueChain(squad_id);
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Get all focus value chain activities
exports.getAllFocusValueChains = async (req, res) => {
    try {
        const activities = await FocusValueChain.getAllFocusValueChains();
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};
