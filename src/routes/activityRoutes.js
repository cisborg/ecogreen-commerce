const express = require('express');
const Activity = require('../models/activity');
const router = express.Router();

// Create a new activity
router.post('/', async (req, res) => {
    const { userId, title, description, points } = req.body;
    const newActivity = await Activity.create(userId, title, description, points);
    res.status(201).json(newActivity);
});

// Get all activities for a user
router.get('/:userId', async (req, res) => {
    const activities = await Activity.getAll(req.params.userId);
    res.json(activities);
});

// Complete an activity
router.patch('/:activityId/complete', async (req, res) => {
    const updatedActivity = await Activity.complete(req.params.activityId);
    res.json(updatedActivity);
});

module.exports = router;
