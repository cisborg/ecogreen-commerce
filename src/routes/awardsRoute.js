const express = require('express');
const { checkAwards } = require('../controllers/awardsController');
const router = express.Router();

router.get('/:userId/awards', async (req, res) => {
    const awards = await checkAwards(req.params.userId);
    res.json(awards);
});

module.exports = router;
