const Note = require('../models/noteModel');
const wrapAsync = require('../middlewares/errorHandler'); 

class NoteController {

   // backend/src/controllers/noteController.js
async addOneNote(req, res) {
        try {
            const { title, text, content } = req.body;
            
            // ดักรับ: ถ้าหน้าบ้านส่งมาเป็น content ให้เอามาใส่ใน text ของ Database
            const finalTitle = title || "Untitled Note";
            const finalContent = text || content || "No Content";

            const newNote = new Note({ 
                title: finalTitle, 
                text: finalContent 
            });

            const saveQuery = await newNote.save();
            res.status(201).json(saveQuery);
        } catch (error) {
            console.error("Add Error:", error);
            res.status(500).json({ message: error.message });
        }
    }
    async getOneNote(req, res) {
        try {
            const queryOne = await Note.findById(req.params.id);
            if (!queryOne) return res.status(404).send("Note not found");
            res.send(queryOne);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

   async updateOneNote(req, res) {
        try {
            const { title, text, content } = req.body;
            const finalContent = text || content;

            const queryUpdate = await Note.findOneAndUpdate(
                { _id: req.params.id }, 
                { 
                    title: title, 
                    text: finalContent 
                },
                { new: true }
            );
            res.send(queryUpdate);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async deleteOneNote(req, res) {
        try {
            const queryDelete = await Note.findOneAndDelete({ _id: req.params.id });
            res.send(queryDelete);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }// เพิ่มส่วนนี้เข้าไปครับ
    async getAllNotes(req, res) {
        try {
            const notes = await Note.find(); // ดึงโน้ตทั้งหมดจาก DB
            res.status(200).json(notes);
        } catch (error) {
            console.error("Get All Notes Error:", error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new NoteController();