const Message = require('../models/messageModel');

// Get messages between users
exports.getMessages = async (req, res) => {
    const { sender_id, recipient_id } = req.params;
    try {
        const messages = await Message.getBySenderAndReceiver(sender_id, recipient_id);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Create new message
exports.createMessage = async (req, res) => {
    const { sender_id, receiver_id, content } = req.body;
    try {
        const newMessage = await Message.create(sender_id, receiver_id, content);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Update message status
exports.updateMessageStatus = async (req, res) => {
    const { message_id, read_status } = req.body;
    try {
        const updatedMessage = await Message.updateStatus(message_id, read_status);
        res.json(updatedMessage);
    } catch (error) {
        if (error.message === 'Message not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Database error' });
    }
};

// Delete message by id
exports.deleteMessage = async (req, res) => {
    const message_id = parseInt(req.params.id);
    try {
        await Message.delete(message_id);
        res.status(204).send();
    } catch (error) {
        if (error.message === 'Message not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Database error' });
    }
};
