const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const noteRouter = require('./router/noteRouter');

// แก้ไขจุดนี้: ใช้การโหลดแบบปกติ
require('dotenv').config(); 

const app = express();
const port = process.env.APP_PORT || 3000;

// Middleware และ Router คงเดิม
app.use(cors());
app.use(express.json());
app.use('/api/notes', noteRouter);

module.exports = app;

if (require.main === module) {
    // ระบบตรวจสอบความปลอดภัยที่คุณเพิ่มไว้ (ดีมากครับ)
    if (!process.env.MONGO_URL) {
        console.error("FATAL ERROR: MONGO_URL is not defined in .env");
        process.exit(1);
    }

    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            app.listen(port, '0.0.0.0', () => {
                console.log(`MongoDB connected. Server running on port ${port}`);
            });
        })
        .catch(error => {
            console.error('Error connecting to MongoDB: ', error);
        });
}