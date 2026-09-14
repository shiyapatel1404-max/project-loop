const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, reportController.listReports);
router.post('/', authenticate, reportController.createReport);
router.get('/:id', authenticate, reportController.getReport);
router.put('/:id', authenticate, reportController.updateReport);
router.delete('/:id', authenticate, authorize('admin', 'manager'), reportController.deleteReport);
router.post('/:id/generate', authenticate, reportController.generateReport);
router.post('/:id/email', authenticate, reportController.emailReport);
router.get('/:id/download', authenticate, reportController.downloadReport);
router.post('/schedule', authenticate, reportController.scheduleReport);

module.exports = router;