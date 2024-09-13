const messages = []; // This will be replaced with a database in a real application

const sendMessage = (fromUser, toUser, content) => {
    messages.push({ from: fromUser, to: toUser, content, timestamp: new Date() });
};

const getMessagesForUser = (username) => {
    return messages.filter(msg => msg.to === username);
};

module.exports = { sendMessage, getMessagesForUser };
