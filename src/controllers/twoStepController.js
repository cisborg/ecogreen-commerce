const speakeasy = require('speakeasy');
const pool = require('../config/dataBs');

const generateSecret = async (userId) => {
    const secret = speakeasy.generateSecret({ length: 20 });
    await pool.query('UPDATE users SET secret = $1 WHERE id = $2', [secret.base32, userId]);
    return secret;
};

const verifyToken = async (userId, token) => {
    const user = await pool.query('SELECT secret FROM users WHERE id = $1', [userId]);
    const verified = speakeasy.totp.verify({
        secret: user.rows[0].secret,
        encoding: 'base32',
        token
    });
    return verified;
};

module.exports = { generateSecret, verifyToken };
