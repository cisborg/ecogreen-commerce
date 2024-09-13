const QuickAction = require('../models/quickActionModel');

// Create a new quick action with a transaction reference
exports.createQuickAction = async (req, res) => {
    const { user_id, action_type, action_details, transaction_id } = req.body;
    try {
        const newAction = await QuickAction.createQuickAction(user_id, action_type, action_details, transaction_id);
        res.status(201).json(newAction);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Get all quick actions for a user
exports.getUserQuickActions = async (req, res) => {
    const user_id = parseInt(req.params.user_id);
    try {
        const actions = await QuickAction.getUserQuickActions(user_id);
        res.json(actions);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Update the status of a quick action
exports.updateQuickActionStatus = async (req, res) => {
    const { action_id, action_status } = req.body;
    try {
        const updatedAction = await QuickAction.updateQuickActionStatus(action_id, action_status);
        res.json(updatedAction);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Get all quick actions
exports.getAllQuickActions = async (req, res) => {
    try {
        const actions = await QuickAction.getAllQuickActions();
        res.json(actions);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};
