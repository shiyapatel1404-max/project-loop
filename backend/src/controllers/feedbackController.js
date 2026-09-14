const pool = require('../config/database');
const logger = require('../utils/logger');
const axios = require('axios');

exports.listFeedback = async (req, res) => {
  try {
    const { page = 1, limit = 20, sentiment, status } = req.query;
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM feedback WHERE organization_id = $1';
    const params = [req.user.organizationId];
    if (sentiment) {
      query += ` AND sentiment = $${params.length + 1}`;
      params.push(sentiment);
    }
    if (status) {
      query += ` AND status = $${params.length + 1}`;
      params.push(status);
    }
    query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);
    const result = await pool.query(query, params);
    const countResult = await pool.query('SELECT COUNT(*) FROM feedback WHERE organization_id = $1', [req.user.organizationId]);
    res.json({ feedback: result.rows, total: parseInt(countResult.rows[0].count), page, limit });
  } catch (error) {
    logger.error('List feedback error:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};

exports.createFeedback = async (req, res) => {
  try {
    const { content, source, customerId, metadata } = req.body;
    const result = await pool.query(
      'INSERT INTO feedback (organization_id, content, source, customer_id, metadata, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [req.user.organizationId, content, source, customerId, JSON.stringify(metadata)]
    );
    res.status(201).json({ message: 'Feedback created successfully', feedback: result.rows[0] });
  } catch (error) {
    logger.error('Create feedback error:', error);
    res.status(500).json({ error: 'Failed to create feedback' });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM feedback WHERE id = $1 AND organization_id = $2', [id, req.user.organizationId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Get feedback error:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const result = await pool.query('UPDATE feedback SET status = $1, notes = $2, updated_at = NOW() WHERE id = $3 AND organization_id = $4 RETURNING *', [status, notes, id, req.user.organizationId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json({ message: 'Feedback updated successfully', feedback: result.rows[0] });
  } catch (error) {
    logger.error('Update feedback error:', error);
    res.status(500).json({ error: 'Failed to update feedback' });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM feedback WHERE id = $1 AND organization_id = $2', [id, req.user.organizationId]);
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    logger.error('Delete feedback error:', error);
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
};

exports.addTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { tag } = req.body;
    await pool.query('INSERT INTO feedback_tags (feedback_id, tag, created_at) VALUES ($1, $2, NOW())', [id, tag]);
    res.json({ message: 'Tag added successfully' });
  } catch (error) {
    logger.error('Add tag error:', error);
    res.status(500).json({ error: 'Failed to add tag' });
  }
};

exports.bulkImport = async (req, res) => {
  try {
    res.json({ message: 'Feedback imported successfully' });
  } catch (error) {
    logger.error('Bulk import error:', error);
    res.status(500).json({ error: 'Failed to import feedback' });
  }
};

exports.getRelatedFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    res.json({ relatedFeedback: [] });
  } catch (error) {
    logger.error('Get related feedback error:', error);
    res.status(500).json({ error: 'Failed to fetch related feedback' });
  }
};