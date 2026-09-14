const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authenticate } = require('../middleware/auth');

router.get('/sentiment', authenticate, analyticsController.getSentimentAnalytics);
router.get('/themes', authenticate, analyticsController.getThemeAnalytics);
router.get('/trends', authenticate, analyticsController.getTrendAnalytics);
router.get('/dashboard', authenticate, analyticsController.getDashboardData);
router.get('/sentiment/timeline', authenticate, analyticsController.getSentimentTimeline);
router.get('/themes/evolution', authenticate, analyticsController.getThemesEvolution);
router.get('/topics', authenticate, analyticsController.getTopics);
router.post('/forecast', authenticate, analyticsController.generateForecast);

module.exports = router;