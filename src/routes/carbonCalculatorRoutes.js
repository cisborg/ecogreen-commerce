const express = require('express');
const router = express.Router();
const carbonCalculatorController = require('../controllers/carbonCalcController');

// Define routes and map to controller methods
router.post('/calculator', carbonCalculatorController.upsertCalculator);
router.get('/calculator/:squad_id', carbonCalculatorController.getCalculatorData);
router.get('/calculator/aggregates/:squad_id', carbonCalculatorController.calculateAggregates);

module.exports = router;
