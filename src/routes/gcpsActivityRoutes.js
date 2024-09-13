const express = require('express');
const { logActivity } = require('../controllers/activityController');
const router = express.Router();

router.post('/log', logActivity);

module.exports = router;
