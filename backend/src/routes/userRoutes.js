const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, authorize('admin', 'manager'), userController.listUsers);
router.post('/', authenticate, authorize('admin'), userController.createUser);
router.get('/:id', authenticate, userController.getUser);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, authorize('admin'), userController.deleteUser);
router.put('/:id/role', authenticate, authorize('admin'), userController.updateRole);
router.post('/:id/deactivate', authenticate, authorize('admin'), userController.deactivateUser);

module.exports = router;