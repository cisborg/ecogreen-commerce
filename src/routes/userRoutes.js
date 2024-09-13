const express = require('express');
const { registerUser, connectUsers, sendUserMessage, getUserMessages, getPopularUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/connect', connectUsers);
router.post('/message', sendUserMessage);
router.get('/messages/:username', getUserMessages);
router.get('/popular', getPopularUsers);

module.exports = router;
