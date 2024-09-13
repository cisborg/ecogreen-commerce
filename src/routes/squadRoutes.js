const express = require('express');
const router = express.Router();
const squadController = require('../controllers/squadController');

// Get all squads
router.get('/', squadController.getAllSquads);

// Create new squad
router.post('/', squadController.createSquad);

// Update squad
router.put('/:id', squadController.updateSquad);

// Delete squad
router.delete('/:id', squadController.deleteSquad);

module.exports = router;
