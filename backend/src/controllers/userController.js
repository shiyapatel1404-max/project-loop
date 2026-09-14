const pool = require('../config/database');
const logger = require('../utils/logger');
const bcrypt = require('bcryptjs');

exports.listUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, first_name, last_name, role, created_at FROM users WHERE organization_id = $1', [req.user.organizationId]);
    res.json({ users: result.rows });
  } catch (error) {
    logger.error('List users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, firstName, lastName, role } = req.body;
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    const result = await pool.query('INSERT INTO users (organization_id, email, password, first_name, last_name, role, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING id, email, first_name, last_name, role', [req.user.organizationId, email, hashedPassword, firstName, lastName, role]);
    res.status(201).json({ message: 'User created successfully', user: result.rows[0], tempPassword });
  } catch (error) {
    logger.error('Create user error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT id, email, first_name, last_name, role FROM users WHERE id = $1 AND organization_id = $2', [id, req.user.organizationId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    const result = await pool.query('UPDATE users SET first_name = $1, last_name = $2, updated_at = NOW() WHERE id = $3 AND organization_id = $4 RETURNING id, email, first_name, last_name, role', [firstName, lastName, id, req.user.organizationId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user: result.rows[0] });
  } catch (error) {
    logger.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = $1 AND organization_id = $2', [id, req.user.organizationId]);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const result = await pool.query('UPDATE users SET role = $1, updated_at = NOW() WHERE id = $2 AND organization_id = $3 RETURNING id, email, role', [role, id, req.user.organizationId]);
    res.json({ message: 'User role updated successfully', user: result.rows[0] });
  } catch (error) {
    logger.error('Update user role error:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
};

exports.deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE users SET is_active = false, updated_at = NOW() WHERE id = $1 AND organization_id = $2', [id, req.user.organizationId]);
    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    logger.error('Deactivate user error:', error);
    res.status(500).json({ error: 'Failed to deactivate user' });
  }
};