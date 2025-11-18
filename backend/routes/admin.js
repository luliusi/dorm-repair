const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/admin/list', async (_req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT r.id, r.title, r.description, r.status, r.created_at, u.username
      FROM repairs r
      JOIN users u ON r.student_id = u.id
      ORDER BY r.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.patch('/admin/repair/:id/complete', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute(
      'UPDATE repairs SET status = ? WHERE id = ?',
      ['completed', id]
    );
    if (result.affectedRows === 0) return res.status(404).send('Repair not found');
    res.json({ message: 'Marked as completed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
