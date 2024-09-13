const Donation = require('../models/donationModel');

// Get donations by user ID
exports.getDonationsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const donations = await Donation.getByUserId(userId);
        res.json(donations);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Create new donation
exports.createDonation = async (req, res) => {
    const { user_id, points_donated, cause } = req.body;
    try {
        const newDonation = await Donation.create(user_id, points_donated, cause);
        res.status(201).json(newDonation);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Update donation
exports.updateDonation = async (req, res) => {
    const { donation_id, points_donated, cause } = req.body;
    try {
        const updatedDonation = await Donation.update(donation_id, points_donated, cause);
        res.json(updatedDonation);
    } catch (error) {
        if (error.message === 'Donation not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Database error' });
    }
};

// Delete donation by ID
exports.deleteDonation = async (req, res) => {
    const { donation_id } = req.params;
    try {
        await Donation.delete(donation_id);
        res.status(204).send();
    } catch (error) {
        if (error.message === 'Donation not found') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Database error' });
    }
};
