require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;
const CONFIG_FILE = path.join(__dirname, 'config.json');

// Supabase Postgres connection string can be provided with either variable
const DATABASE_URL = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

if (!DATABASE_URL) {
  console.error('Missing database connection string. Set DATABASE_URL (or SUPABASE_DB_URL).');
  process.exit(1);
}

// Supabase Connection
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Database Initialization
const initDb = async () => {
  try {
    // Create table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        config JSONB NOT NULL
      );
    `);

    // Check if we have any config
    const res = await pool.query('SELECT * FROM site_settings WHERE id = 1');
    if (res.rows.length === 0) {
      console.log('📦 Database is empty. Seeding from config.json...');
      let initialConfig = {};
      if (fs.existsSync(CONFIG_FILE)) {
        try {
          initialConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
        } catch (parseError) {
          console.error('Error parsing config.json:', parseError);
        }
      }
      await pool.query('INSERT INTO site_settings (id, config) VALUES (1, $1)', [initialConfig]);
      console.log('✅ Database seeded successfully.');
    }
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  }
};

initDb();

// Allow requests from the frontend (local or Vercel)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Accept large payloads (base64 images can be big)
app.use(express.json({ limit: '50mb' }));

// ─── GET /api/config ──────────────────────────────────────────────────────────
// Returns the current saved config from the database
app.get('/api/config', async (req, res) => {
  try {
    const result = await pool.query('SELECT config FROM site_settings WHERE id = 1');
    if (result.rows.length === 0) {
      return res.json({});
    }
    res.json(result.rows[0].config);
  } catch (e) {
    console.error('Error reading config from DB:', e);
    res.status(500).json({ error: 'Failed to read config from database' });
  }
});

// ─── POST /api/config ─────────────────────────────────────────────────────────
// Saves the new config sent by the admin dashboard to the database
app.post('/api/config', async (req, res) => {
  try {
    const newConfig = req.body;
    if (!newConfig || typeof newConfig !== 'object') {
      return res.status(400).json({ error: 'Invalid config data' });
    }
    
    await pool.query(
      'INSERT INTO site_settings (id, config) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET config = $1',
      [newConfig]
    );

    console.log('Config saved to database at', new Date().toISOString());
    res.json({ success: true, savedAt: new Date().toISOString() });
  } catch (e) {
    console.error('Error saving config to DB:', e);
    res.status(500).json({ error: 'Failed to save config to database' });
  }
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', database: 'connected' }));

app.listen(PORT, () => {
  console.log(`🎂 Birthday Wish Backend running on http://localhost:${PORT}`);
});
