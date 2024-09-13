const express = require('express');
const router = express.Router();
const FocusValueChainController = require('../controllers/focusValueChainController');

// Route to update the percentage achieved for a specific activity
router.put('/focus-value-chain/update-percentage', FocusValueChainController.updatePercentageAchieved);

// Route to get all focus value chain activities for a specific squad
router.get('/focus-value-chain/squad/:squad_id', FocusValueChainController.getSquadFocusValueChain);

// Route to get all focus value chain activities
router.get('/focus-value-chain', FocusValueChainController.getAllFocusValueChains);

module.exports = router;
