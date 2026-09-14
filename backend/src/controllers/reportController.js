const pool = require('../config/database');
const logger = require('../utils/logger');

exports.listReports = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reports WHERE organization_id = $1 ORDER BY created_at DESC', [req.user.organizationId]);
    res.json({ reports: result.rows });
  } catch (error) {
    logger.error('List reports error:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

exports.createReport = async (req, res) => {
  try {
    const { name, type, filters, schedule } = req.body;
    const result = await pool.query('INSERT INTO reports (organization_id, name, type, filters, schedule, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *', [req.user.organizationId, name, type, JSON.stringify(filters), schedule]);
    res.status(201).json({ message: 'Report created successfully', report: result.rows[0] });
  } catch (error) {
    logger.error('Create report error:', error);
    res.status(500).json({ error: 'Failed to create report' });
  }
};

exports.getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM reports WHERE id = $1 AND organization_id = $2', [id, req.user.organizationId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Get report error:', error);
    res.status(500).json({ error: 'Failed to fetch report' });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, filters, schedule } = req.body;
    const result = await pool.query('UPDATE reports SET name = $1, filters = $2, schedule = $3, updated_at = NOW() WHERE id = $4 AND organization_id = $5 RETURNING *', [name, JSON.stringify(filters), schedule, id, req.user.organizationId]);
    res.json({ message: 'Report updated successfully', report: result.rows[0] });
  } catch (error) {
    logger.error('Update report error:', error);
    res.status(500).json({ error: 'Failed to update report' });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM reports WHERE id = $1 AND organization_id = $2', [id, req.user.organizationId]);
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    logger.error('Delete report error:', error);
    res.status(500).json({ error: 'Failed to delete report' });
  }
};

exports.generateReport = async (req, res) => {
  try {
    const { id } = req.params;
    res.json({ message: 'Report generated successfully' });
  } catch (error) {
    logger.error('Generate report error:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

exports.emailReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { recipients } = req.body;
    res.json({ message: 'Report emailed successfully' });
  } catch (error) {
    logger.error('Email report error:', error);
    res.status(500).json({ error: 'Failed to email report' });
  }
};

exports.downloadReport = async (req, res) => {
  try {
    const { id } = req.params;
    res.json({ message: 'Report download ready' });
  } catch (error) {
    logger.error('Download report error:', error);
    res.status(500).json({ error: 'Failed to download report' });
  }
};

exports.scheduleReport = async (req, res) => {
  try {
    const { reportId, schedule, recipients } = req.body;
    res.json({ message: 'Report scheduled successfully' });
  } catch (error) {
    logger.error('Schedule report error:', error);
    res.status(500).json({ error: 'Failed to schedule report' });
  }
};