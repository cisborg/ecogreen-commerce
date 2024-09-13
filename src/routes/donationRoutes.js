const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

// Get all donations for a specific user
router.get('/user/:userId', donationController.getDonationsByUserId);

// Create a new donation
router.post('/', donationController.createDonation);

// Update an existing donation
router.put('/', donationController.updateDonation);

// Delete a donation by ID
router.delete('/:donation_id', donationController.deleteDonation);

module.exports = router;
