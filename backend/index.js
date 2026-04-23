const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const CONFIG_FILE = path.join(__dirname, 'config.json');

// Allow requests from the frontend (local or Vercel)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Accept large payloads (base64 images can be big)
app.use(express.json({ limit: '50mb' }));

// ─── GET /api/config ──────────────────────────────────────────────────────────
// Returns the current saved config
app.get('/api/config', (req, res) => {
  try {
    if (!fs.existsSync(CONFIG_FILE)) {
      return res.json({});
    }
    const raw = fs.readFileSync(CONFIG_FILE, 'utf-8');
    const config = JSON.parse(raw);
    res.json(config);
  } catch (e) {
    console.error('Error reading config:', e);
    res.status(500).json({ error: 'Failed to read config' });
  }
});

// ─── POST /api/config ─────────────────────────────────────────────────────────
// Saves the new config sent by the admin dashboard
app.post('/api/config', (req, res) => {
  try {
    const newConfig = req.body;
    if (!newConfig || typeof newConfig !== 'object') {
      return res.status(400).json({ error: 'Invalid config data' });
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(newConfig, null, 2), 'utf-8');
    console.log('Config saved successfully at', new Date().toISOString());
    res.json({ success: true, savedAt: new Date().toISOString() });
  } catch (e) {
    console.error('Error saving config:', e);
    res.status(500).json({ error: 'Failed to save config' });
  }
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`🎂 Birthday Wish Backend running on http://localhost:${PORT}`);
});
