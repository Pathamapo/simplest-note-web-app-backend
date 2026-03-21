const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const noteRouter = require('./router/noteRouter');
require('dotenv').config();

const app = express();
const port = process.env.APP_PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/notes', noteRouter);

// ✅ health check (สำคัญมาก)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;

// run server (เฉพาะตอนไม่ได้ test)
if (require.main === module) {
  (async () => {
    try {
      if (!process.env.MONGO_URL) {
        console.error("FATAL ERROR: MONGO_URL is not defined");
        process.exit(1);
      }

      // ใช้ top-level await ภายใน async IIFE
      await mongoose.connect(process.env.MONGO_URL);

      app.listen(port, '0.0.0.0', () => {
        console.log(`Server running on port ${port}`);
      });
    } catch (err) {
      console.error("Failed to connect to MongoDB:", err);
      process.exit(1);
    }
  })();
}