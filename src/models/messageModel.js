const db = require('../config/database');

class Message {
    // Get messages between users
    static async getBySenderAndReceiver(sender_id, receiver_id) {
        const result = await db.query(
            'SELECT * FROM messages WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)',
            [sender_id, receiver_id]
        );
        return result.rows;
    }

    // Create a new message
    static async create(sender_id, receiver_id, content) {
        const result = await db.query(
            'INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *',
            [sender_id, receiver_id, content]
        );
        return result.rows[0];
    }

    // Update message status
    static async updateStatus(message_id, read_status) {
        const result = await db.query(
            'UPDATE messages SET read_status = $1 WHERE message_id = $2 RETURNING *',
            [read_status, message_id]
        );
        if (result.rowCount === 0) {
            throw new Error('Message not found');
        }
        return result.rows[0];
    }

    // Delete message by ID
    static async delete(message_id) {
        const result = await db.query('DELETE FROM messages WHERE message_id = $1', [message_id]);
        if (result.rowCount === 0) {
            throw new Error('Message not found');
        }
    }
}

module.exports = Message;
