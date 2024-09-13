const express = require('express');
const router = express.Router();
const squadMemberController = require('../controllers/squadMemberController');

// Get all members of a squad
router.get('/:squad_id', squadMemberController.getAllMembers);

// Add a new member
router.post('/', squadMemberController.addMember);

// Approve a member
router.put('/approve/:squad_member_id', squadMemberController.approveMember);

// Delete a member
router.delete('/:squad_member_id', squadMemberController.deleteMember);

module.exports = router;
