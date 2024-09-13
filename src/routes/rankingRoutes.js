const express = require('express');
const { getUserRankings, getSquadRankings } = require('../controllers/ranking');
const router = express.Router();

router.get('/user-rankings', async (req, res) => {
    const rankings = await getUserRankings();
    res.json(rankings);
});

router.get('/squad-rankings', async (req, res) => {
    const rankings = await getSquadRankings();
    res.json(rankings);
});

module.exports = router;
