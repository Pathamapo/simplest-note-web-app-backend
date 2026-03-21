const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index');

/**
 * ก่อนเริ่มเทสต์: เชื่อมต่อ MongoDB
 */
beforeAll(async () => {
    const url = process.env.MONGO_URL;

    if (!url) {
        throw new Error("MONGO_URL is not defined (ต้องตั้งใน Pipeline)");
    }

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(url);
    }
});

/**
 * ล้าง DB ก่อนทุก test (กัน test พัง)
 */
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
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

    it('POST /api/notes/add', async () => {
        const newNote = {
            title: "test",
            text: "hello"
        };

        const res = await request(app)
            .post('/api/notes/add')
            .send(newNote);

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe(newNote.title);
        expect(res.body).toHaveProperty('_id');
    });

    it('GET /api/notes/getall', async () => {
        const res = await request(app).get('/api/notes/getall');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('404 invalid path', async () => {
        const res = await request(app).get('/api/notes/invalidpath');
        expect(res.statusCode).toBe(404);
    });

});