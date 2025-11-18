require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS calc');
    res.send(`API OK, MySQL calc: ${rows[0].calc}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('DB error');
  }
});

// 挂载认证路由
const authRouter = require('./routes/auth');
app.use('/api', authRouter);

const repairRouter = require('./routes/repair');
app.use('/api', repairRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
