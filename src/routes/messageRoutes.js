const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Get all messages between a sender and recipient
router.get('/:sender_id/:recipient_id', messageController.getMessages);

// Create a new message
router.post('/', messageController.createMessage);

// Update message read status
router.put('/', messageController.updateMessageStatus);

// Delete a message by ID
router.delete('/:id', messageController.deleteMessage);

module.exports = router;
