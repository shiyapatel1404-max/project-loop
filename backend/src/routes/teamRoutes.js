const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, teamController.listTeams);
router.post('/', authenticate, authorize('admin', 'manager'), teamController.createTeam);
router.get('/:id', authenticate, teamController.getTeam);
router.put('/:id', authenticate, authorize('admin', 'manager'), teamController.updateTeam);
router.delete('/:id', authenticate, authorize('admin'), teamController.deleteTeam);
router.post('/:id/members', authenticate, authorize('admin', 'manager'), teamController.addMember);
router.delete('/:id/members/:memberId', authenticate, authorize('admin', 'manager'), teamController.removeMember);

module.exports = router;