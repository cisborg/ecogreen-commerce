const Squad = require('../models/squadModel');

// Get all squads
exports.getAllSquads = async (req, res) => {
    try {
        const squads = await Squad.getAll();
        res.json(squads);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Create new squad
exports.createSquad = async (req, res) => {
    const { name, description, total_green_points, is_premium, admin_id, status } = req.body;
    try {
        const newSquad = await Squad.create(name, description, total_green_points, is_premium, admin_id, status);
        res.status(201).json(newSquad);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Update squad
exports.updateSquad = async (req, res) => {
    const { id, name, description, status } = req.body;
    try {
        const updatedSquad = await Squad.update(id, name, description, status);
        if (!updatedSquad) {
            return res.status(404).json({ error: 'Squad not found' });
        }
        res.json(updatedSquad);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Delete squad
exports.deleteSquad = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletedSquad = await Squad.delete(id);
        if (!deletedSquad) {
            return res.status(404).json({ error: 'Squad not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};
