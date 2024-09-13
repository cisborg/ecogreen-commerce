const SquadMember = require('../models/squadMemberModel');

// Get all members of a squad
exports.getAllMembers = async (req, res) => {
    const squad_id = parseInt(req.params.squad_id);
    try {
        const members = await SquadMember.getAllBySquadId(squad_id);
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Add a new member
exports.addMember = async (req, res) => {
    const { squad_id, user_id, role } = req.body;
    try {
        const newMember = await SquadMember.addMember(squad_id, user_id, role);
        res.status(201).json(newMember);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Approve a member
exports.approveMember = async (req, res) => {
    const squad_member_id = parseInt(req.params.squad_member_id);
    try {
        const approvedMember = await SquadMember.approveMember(squad_member_id);
        if (!approvedMember) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json(approvedMember);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Delete a member
exports.deleteMember = async (req, res) => {
    const squad_member_id = parseInt(req.params.squad_member_id);
    try {
        const deletedMember = await SquadMember.deleteMember(squad_member_id);
        if (!deletedMember) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};
