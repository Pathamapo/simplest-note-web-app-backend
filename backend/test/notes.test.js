require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index');

let createdNoteId;

/**
 * ก่อนเริ่มเทสต์
 */
beforeAll(async () => {
    const url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/notesdb';
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(url);
    }
});

/**
 * หลังจบ
 */
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Notes API Integration Test', () => {

    it('POST /api/notes/add', async () => {
        const newNote = {
            title: "test note",
            text: "test content"
        };

        const res = await request(app)
            .post('/api/notes/add')
            .send(newNote);

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe(newNote.title);
        expect(res.body).toHaveProperty('_id');

        createdNoteId = res.body._id; // เก็บไว้ใช้
    });

    it('GET /api/notes/getall', async () => {
        const res = await request(app).get('/api/notes/getall');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0); // ตอนนี้จะผ่านแล้ว
    });

    it('404 invalid path', async () => {
        const res = await request(app).get('/api/notes/invalidpath');
        expect(res.statusCode).toBe(404);
    });

});