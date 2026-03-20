require('dotenv').config(); // ตรวจสอบตำแหน่ง .env ให้ถูกต้อง
const request = require('supertest'); // ต้องมีบรรทัดนี้เพื่อเรียกใช้งาน supertest
const mongoose = require('mongoose');
const app = require('../src/index');

/**
 * ก่อนเริ่มเทสต์: เชื่อมต่อ MongoDB
 */
beforeAll(async () => {
    const url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/notesdb';
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(url);
    }
});

/**
 * หลังเทสต์เสร็จ: ปิดการเชื่อมต่อ
 */
afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
    }
});

describe('Notes API Integration Test', () => {

    it('ควรจะ POST สร้างโน้ตใหม่ได้ที่ /api/notes/add', async () => {
        const newNote = {
            title: "เทสต์จาก Jest",
            text: "เนื้อหาที่บันทึกจริงลง DB" // ใช้ 'text' ให้ตรงกับ Schema ใน noteModel.js
        };

        const res = await request(app)
            .post('/api/notes/add') // Path ตรงตาม noteRouter.js
            .send(newNote);

        expect(res.statusCode).toEqual(201); 
        expect(res.body.title).toBe(newNote.title);
        expect(res.body).toHaveProperty('_id');
    });

    it('ควรจะ GET ข้อมูลโน้ตทั้งหมดได้ที่ /api/notes/getall', async () => {
        const res = await request(app).get('/api/notes/getall');
        
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('ควรจะคืนค่า 404 เมื่อเรียก Path ที่ไม่มีอยู่จริง', async () => {
        const res = await request(app).get('/api/notes/invalidpath');
        expect(res.statusCode).toEqual(404);
    });

});