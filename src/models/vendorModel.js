const pool = require('./src/config/database');

const Vendor = {
    create: async (name, description, location, contactInfo) => {
        const result = await pool.query('INSERT INTO vendors (name, description, location, contact_info) VALUES ($1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326), $5) RETURNING *', 
            [name, description, location.lng, location.lat, contactInfo]);
        return result.rows[0];
    },
    getNearby: async (userLocation) => {
        const result = await pool.query(`
            SELECT *, ST_Distance(location::geography, ST_SetSRID(ST_MakePoint($1, $2), 4326)) AS distance 
            FROM vendors 
            WHERE ST_DWithin(location::geography, ST_SetSRID(ST_MakePoint($1, $2), 4326), 10000) 
            ORDER BY distance
        `, [userLocation.lng, userLocation.lat]);
        return result.rows;
    },
    report: async (vendorId) => {
        const result = await pool.query('UPDATE vendors SET is_reported = TRUE WHERE id = $1 RETURNING *', [vendorId]);
        return result.rows[0];
    }
};

module.exports = Vendor;
