const database = require('../config/database');

// Get all vendors
exports.getAllVendors = async (req, res) => {
    try {
        const result = await database.query('SELECT * FROM vendors');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Database connection error' });
    }
};

// Create new vendor
exports.createVendor = async (req, res) => {
    const { name, description, location, contact_info, product_repository_id } = req.body;

    try {
        const result = await database.query(
            'INSERT INTO vendors (name, description, location, contact_info, product_repository_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, description, location, contact_info, product_repository_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Database connection error' });
    }
};

// Get vendor by ID
exports.getVendorById = async (req, res) => {
    const vendor_id = parseInt(req.params.id);

    try {
        const result = await database.query('SELECT * FROM vendors WHERE id = $1', [vendor_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Vendor not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Database connection error' });
    }
};

// Update vendor by ID
exports.updateVendor = async (req, res) => {
    const vendor_id = parseInt(req.params.id);
    const { name, description, location, contact_info, product_repository_id, is_reported, rating, is_verified } = req.body;

    try {
        const result = await database.query(
            'UPDATE vendors SET name = $1, description = $2, location = $3, contact_info = $4, product_repository_id = $5, is_reported = $6, rating = $7, is_verified = $8 WHERE id = $9 RETURNING *',
            [name, description, location, contact_info, product_repository_id, is_reported, rating, is_verified, vendor_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Vendor not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Database connection error' });
    }
};

// Delete vendor by ID
exports.deleteVendor = async (req, res) => {
    const vendor_id = parseInt(req.params.id);

    try {
        const result = await database.query('DELETE FROM vendors WHERE id = $1 RETURNING *', [vendor_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Vendor not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Database connection error' });
    }
};
