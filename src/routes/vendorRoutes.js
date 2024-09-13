const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

// Get all vendors
router.get('/', vendorController.getAllVendors);

// Create new vendor
router.post('/', vendorController.createVendor);

// Get vendor by ID
router.get('/:id', vendorController.getVendorById);

// Update vendor by ID
router.put('/:id', vendorController.updateVendor);

// Delete vendor by ID
router.delete('/:id', vendorController.deleteVendor);

module.exports = router;
