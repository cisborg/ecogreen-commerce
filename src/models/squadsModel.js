const db = require('../config/database');

class Squad {
    // Get all squads
    static async getAll() {
        const result = await db.query('SELECT * FROM squads');
        return result.rows;
    }

    // Create a new squad
    static async create(name, description, total_green_points = 0, is_premium = false, admin_id = null, status = false) {
        const result = await db.query(
            'INSERT INTO squads (name, description, total_green_points, is_premium, admin_id, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, description, total_green_points, is_premium, admin_id, status]
        );
        return result.rows[0];
    }

    // Update squad by ID
    static async update(id, name, description, status) {
        const result = await db.query(
            'UPDATE squads SET name=$1, description=$2, status=$3 WHERE id=$4 RETURNING *',
            [name, description, status, id]
        );
        return result.rowCount ? result.rows[0] : null;
    }

    // Delete squad by ID
    static async delete(id) {
        const result = await db.query('DELETE FROM squads WHERE id=$1 RETURNING *', [id]);
        return result.rowCount ? result.rows[0] : null;
    }
}

module.exports = Squad;
