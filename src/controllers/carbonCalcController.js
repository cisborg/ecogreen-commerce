const CarbonCalculator = require('../models/carbonCalculatorModel');

// Upsert carbon calculator data
exports.upsertCalculator = async (req, res) => {
    const { squad_id, carbon_footprint, threshold, badge_earned } = req.body;
    try {
        const updatedEntry = await CarbonCalculator.upsertCalculator(squad_id, carbon_footprint, threshold, badge_earned);
        res.json(updatedEntry);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Get carbon calculator data for a specific squad
exports.getCalculatorData = async (req, res) => {
    const squad_id = parseInt(req.params.squad_id);
    try {
        const data = await CarbonCalculator.getCalculatorData(squad_id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Calculate aggregates for activities, donations, and purchases
exports.calculateAggregates = async (req, res) => {
    const squad_id = parseInt(req.params.squad_id);
    try {
        const aggregates = await CarbonCalculator.calculateAggregates(squad_id);
        res.json(aggregates);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};