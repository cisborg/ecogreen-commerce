const users = []; // This will be replaced with a database in a real application

const createUser = (userData) => {
    users.push(userData);
};

const findUser = (username) => {
    return users.find(user => user.username === username);
};

const getPopularUsers = () => {
    return users.sort((a, b) => b.awards - a.awards).slice(0, 10); // Top 10 most awarded users
};

module.exports = { createUser, findUser, getPopularUsers };
