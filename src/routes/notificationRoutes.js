const express = require('express');
const Notification = require('../models/notification');
const router = express.Router();

// Create a new notification
router.post('/', async (req, res) => {
    const { userId, message } = req.body;
    const newNotification = await Notification.create(userId, message);
    res.status(201).json(newNotification);
});

// Get all notifications for a user
router.get('/:userId', async (req, res) => {
    const notifications = await Notification.getAll(req.params.userId);
    res.json(notifications);
});

module.exports = router;
