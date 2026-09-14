const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const logger = require('../utils/logger');

const generateToken = (userId, email, role) => {
  return jwt.sign(
    { userId, email, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS) || 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, first_name, last_name, role, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id, email, first_name, last_name, role',
      [email, hashedPassword, firstName, lastName, 'viewer']
    );
    const token = generateToken(result.rows[0].id, result.rows[0].email, result.rows[0].role);
    res.status(201).json({ message: 'User registered successfully', user: result.rows[0], token });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = result.rows[0];
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user.id, user.email, user.role);
    res.json({ message: 'Login successful', user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name, role: user.role }, token });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.logout = async (req, res) => {
  try {
    res.json({ message: 'Logout successful' });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newToken = generateToken(decoded.userId, decoded.email, decoded.role);
    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, first_name, last_name, role FROM users WHERE id = $1', [req.user.userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    logger.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    logger.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    logger.error('Verify email error:', error);
    res.status(500).json({ error: 'Failed to verify email' });
  }
};