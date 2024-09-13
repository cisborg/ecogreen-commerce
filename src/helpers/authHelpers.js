const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); //  .env loaded for environment variables

// Hash Password
const hashPassword = async (password) => {
    const saltRounds = 7;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

// Generate Token
const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        // Add other user details if needed
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Customize the token expiration
    return token;
};

module.exports = {
    hashPassword,
    generateToken,
};
