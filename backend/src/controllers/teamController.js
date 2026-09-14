const pool = require('../config/database');
const logger = require('../utils/logger');

exports.listTeams = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM teams WHERE organization_id = $1', [req.user.organizationId]);
    res.json({ teams: result.rows });
  } catch (error) {
    logger.error('List teams error:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
};

exports.createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await pool.query('INSERT INTO teams (organization_id, name, description, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *', [req.user.organizationId, name, description]);
    res.status(201).json({ message: 'Team created successfully', team: result.rows[0] });
  } catch (error) {
    logger.error('Create team error:', error);
    res.status(500).json({ error: 'Failed to create team' });
  }
};

exports.getTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM teams WHERE id = $1 AND organization_id = $2', [id, req.user.organizationId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Get team error:', error);
    res.status(500).json({ error: 'Failed to fetch team' });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const result = await pool.query('UPDATE teams SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 AND organization_id = $4 RETURNING *', [name, description, id, req.user.organizationId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({ message: 'Team updated successfully', team: result.rows[0] });
  } catch (error) {
    logger.error('Update team error:', error);
    res.status(500).json({ error: 'Failed to update team' });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM teams WHERE id = $1 AND organization_id = $2', [id, req.user.organizationId]);
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    logger.error('Delete team error:', error);
    res.status(500).json({ error: 'Failed to delete team' });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    await pool.query('INSERT INTO team_members (team_id, user_id, created_at) VALUES ($1, $2, NOW())', [id, userId]);
    res.json({ message: 'Member added successfully' });
  } catch (error) {
    logger.error('Add member error:', error);
    res.status(500).json({ error: 'Failed to add member' });
  }
};

exports.removeMember = async (req, res) => {
  try {
    const { id, memberId } = req.params;
    await pool.query('DELETE FROM team_members WHERE team_id = $1 AND user_id = $2', [id, memberId]);
    res.json({ message: 'Member removed successfully' });
  } catch (error) {
    logger.error('Remove member error:', error);
    res.status(500).json({ error: 'Failed to remove member' });
  }
};