const { createUser, findUser, getPopularUsers } = require('../models/user');
const { sendMessage, getMessagesForUser } = require('../models/message');

const registerUser = (req, res) => {
    const userData = req.body;
    createUser(userData);
    res.status(201).json({ message: 'User created successfully!' });
};

const connectUsers = (req, res) => {
    // Logic to connect users
    res.json({ message: 'Users connected!' });
};

const sendUserMessage = (req, res) => {
    const { fromUser, toUser, content } = req.body;
    sendMessage(fromUser, toUser, content);
    res.json({ message: 'Message sent!' });
};

const getUserMessages = (req, res) => {
    const { username } = req.params;
    const messages = getMessagesForUser(username);
    res.json(messages);
};

const getPopularUsers = (req, res) => {
    const popularUsers = getPopularUsers();
    res.json(popularUsers);
};

module.exports = { registerUser, connectUsers, sendUserMessage, getUserMessages, getPopularUsers };
