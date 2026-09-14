const pool = require('../config/database');
const logger = require('../utils/logger');

exports.getSentimentAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const result = await pool.query('SELECT sentiment, COUNT(*) as count FROM feedback WHERE organization_id = $1 AND created_at BETWEEN $2 AND $3 GROUP BY sentiment', [req.user.organizationId, startDate, endDate]);
    res.json({ sentimentDistribution: result.rows, total: result.rows.reduce((sum, row) => sum + parseInt(row.count), 0) });
  } catch (error) {
    logger.error('Get sentiment analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch sentiment analytics' });
  }
};

exports.getThemeAnalytics = async (req, res) => {
  try {
    const result = await pool.query('SELECT theme, COUNT(*) as frequency FROM themes WHERE organization_id = $1 GROUP BY theme ORDER BY frequency DESC LIMIT 20', [req.user.organizationId]);
    res.json({ themes: result.rows });
  } catch (error) {
    logger.error('Get theme analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch theme analytics' });
  }
};

exports.getTrendAnalytics = async (req, res) => {
  try {
    const result = await pool.query('SELECT DATE(created_at) as date, sentiment, COUNT(*) as count FROM feedback WHERE organization_id = $1 AND created_at >= NOW() - INTERVAL \'30 days\' GROUP BY DATE(created_at), sentiment ORDER BY date ASC', [req.user.organizationId]);
    res.json({ trends: result.rows });
  } catch (error) {
    logger.error('Get trend analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch trend analytics' });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const feedbackCount = await pool.query('SELECT COUNT(*) FROM feedback WHERE organization_id = $1', [req.user.organizationId]);
    const sentimentData = await pool.query('SELECT sentiment, COUNT(*) as count FROM feedback WHERE organization_id = $1 GROUP BY sentiment', [req.user.organizationId]);
    const recentFeedback = await pool.query('SELECT * FROM feedback WHERE organization_id = $1 ORDER BY created_at DESC LIMIT 5', [req.user.organizationId]);
    res.json({ totalFeedback: parseInt(feedbackCount.rows[0].count), sentimentDistribution: sentimentData.rows, recentFeedback: recentFeedback.rows });
  } catch (error) {
    logger.error('Get dashboard data error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};

exports.getSentimentTimeline = async (req, res) => {
  try {
    const result = await pool.query('SELECT DATE(created_at) as date, sentiment, COUNT(*) as count FROM feedback WHERE organization_id = $1 GROUP BY DATE(created_at), sentiment ORDER BY date ASC', [req.user.organizationId]);
    res.json({ timeline: result.rows });
  } catch (error) {
    logger.error('Get sentiment timeline error:', error);
    res.status(500).json({ error: 'Failed to fetch sentiment timeline' });
  }
};

exports.getThemesEvolution = async (req, res) => {
  try {
    const result = await pool.query('SELECT DATE(created_at) as date, theme, COUNT(*) as count FROM themes WHERE organization_id = $1 GROUP BY DATE(created_at), theme ORDER BY date ASC', [req.user.organizationId]);
    res.json({ evolution: result.rows });
  } catch (error) {
    logger.error('Get themes evolution error:', error);
    res.status(500).json({ error: 'Failed to fetch themes evolution' });
  }
};

exports.getTopics = async (req, res) => {
  try {
    const result = await pool.query('SELECT topic, COUNT(*) as frequency FROM topics WHERE organization_id = $1 GROUP BY topic ORDER BY frequency DESC', [req.user.organizationId]);
    res.json({ topics: result.rows });
  } catch (error) {
    logger.error('Get topics error:', error);
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
};

exports.generateForecast = async (req, res) => {
  try {
    res.json({ forecast: [] });
  } catch (error) {
    logger.error('Generate forecast error:', error);
    res.status(500).json({ error: 'Failed to generate forecast' });
  }
};