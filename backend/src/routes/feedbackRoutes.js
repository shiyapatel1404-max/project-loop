const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { authenticate, authorize } = require('../middleware/auth');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/', authenticate, feedbackController.listFeedback);
router.post('/', authenticate, feedbackController.createFeedback);
router.get('/:id', authenticate, feedbackController.getFeedback);
router.put('/:id', authenticate, feedbackController.updateFeedback);
router.delete('/:id', authenticate, authorize('admin', 'manager'), feedbackController.deleteFeedback);
router.post('/:id/tags', authenticate, feedbackController.addTag);
router.post('/bulk/import', authenticate, upload.single('file'), feedbackController.bulkImport);
router.get('/:id/related', authenticate, feedbackController.getRelatedFeedback);

module.exports = router;