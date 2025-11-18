const express = require('express');
const pool = require('../db');

const router = express.Router();

router.post('/repair', async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).send('Missing title or description');

  try {
    const [result] = await pool.execute(
      'INSERT INTO repairs (student_id, title, description) VALUES (1, ?, ?)',
      [title, description]
    );
    res.json({ id: result.insertId, title, description });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
