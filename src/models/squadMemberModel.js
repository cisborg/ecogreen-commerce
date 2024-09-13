const db = require('../config/database');

class SquadMember {
    // Get all members of a squad
    static async getAllBySquadId(squad_id) {
        const result = await db.query('SELECT * FROM squad_members WHERE squad_id = $1', [squad_id]);
        return result.rows;
    }

    // Add a new member
    static async addMember(squad_id, user_id, role, is_approved = false) {
        const result = await db.query(
            'INSERT INTO squad_members (squad_id, user_id, role, is_approved) VALUES ($1, $2, $3, $4) RETURNING *',
            [squad_id, user_id, role, is_approved]
        );
        return result.rows[0];
    }

    // Approve a member
    static async approveMember(squad_member_id) {
        const result = await db.query(
            'UPDATE squad_members SET is_approved = TRUE WHERE squad_member_id = $1 RETURNING *',
            [squad_member_id]
        );
        return result.rowCount ? result.rows[0] : null;
    }

    // Delete a member
    static async deleteMember(squad_member_id) {
        const result = await db.query('DELETE FROM squad_members WHERE squad_member_id = $1 RETURNING *', [squad_member_id]);
        return result.rowCount ? result.rows[0] : null;
    }
}

module.exports = SquadMember;
