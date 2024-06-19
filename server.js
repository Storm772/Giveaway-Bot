const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000; // Get port from .env or default to 3000

// Helmet for securing HTTP headers
console.log('[DEBUG] Initializing Helmet for security.');
app.use(helmet());

// Rate limiting
console.log('[DEBUG] Setting up rate limiting.');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(limiter);

// Serve static files from the "public" directory
console.log('[DEBUG] Serving static files from the "public" directory.');
app.use(express.static('public'));

// Define a route to serve index.html
app.get('/', (req, res) => {
  console.log('[DEBUG] GET request received for "/" route. Serving index.html.');
  res.sendFile(__dirname + '/public/index.html');
});

// Define a route to serve configuration
app.get('/config', (req, res) => {
  try {
    const config = {
      displayGreenPoint: process.env.DISPLAY_GREEN_POINT === 'true',
      passwordHash: process.env.PASSWORD_HASH
    };
    res.json(config);
  } catch (error) {
    console.error('[ERROR] Failed to send config:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`[DEBUG] Server is running on http://localhost:${port} ✅`);
}).on('error', (err) => {
  console.error('[ERROR] Failed to start server: ❌', err);
});

console.log('[DEBUG] Web server initialization complete.');