const express = require('express');
const Vendor = require('../models/vendor');
const router = express.Router();

// Create a new vendor
router.post('/', async (req, res) => {
    const { name, description, location, contactInfo } = req.body;
    const newVendor = await Vendor.create(name, description, location, contactInfo);
    res.status(201).json(newVendor);
});

// Get nearby vendors
router.get('/nearby', async (req, res) => {
    const { lng, lat } = req.query;
    const vendors = await Vendor.getNearby({ lng, lat });
    res.json(vendors);
});

// Report a vendor
router.patch('/:vendorId/report', async (req, res) => {
    const reportedVendor = await Vendor.report(req.params.vendorId);
    res.json(reportedVendor);
});

module.exports = router;
