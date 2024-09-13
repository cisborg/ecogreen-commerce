const express = require('express');
const router = express.Router();
const QuickActionController = require('../controllers/quickActionController');

// Route to create a new quick action
router.post('/quick-actions', QuickActionController.createQuickAction);

// Route to get all quick actions for a user
router.get('/quick-actions/user/:user_id', QuickActionController.getUserQuickActions);

// Route to update the status of a quick action
router.put('/quick-actions/status', QuickActionController.updateQuickActionStatus);

// Route to get all quick actions
router.get('/quick-actions', QuickActionController.getAllQuickActions);

module.exports = router;
