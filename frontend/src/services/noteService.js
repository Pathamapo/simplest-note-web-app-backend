import axios from 'axios';

// ใช้ตัวแปร VITE_API_URL จาก .env
// fallback เป็น localhost สำหรับ development
const API_URL = process.env.VUE_APP_API_URL || `http://localhost:3000/api/notes`;

export default {
  serverDown() {
    alert("Can't connect to the server");
  },

  async getAllNotes() {
    let chunk = {};
    await axios.get(API_URL + '/getall')
      .then((response) => { chunk = response })
      .catch(() => { this.serverDown() });
    return chunk;
  },

  async addNote(data) {
    let chunk = {};
    await axios.post(API_URL + '/add', data)
      .then((response) => { chunk = response })
      .catch(() => { this.serverDown() });
    return chunk;
  },

  async deleteNote(id) {
    let chunk = {};
    await axios.delete(API_URL + `/delete/${id}`)
      .then((response) => { chunk = response })
      .catch(() => { this.serverDown() });
    return chunk;
  },

  async getNoteById(id) {
    let chunk = {};
    await axios.get(API_URL + `/get/${id}`)
      .then((response) => { chunk = response })
      .catch(() => { this.serverDown() });
    return chunk;
  },

  async updateNoteById(id, data) {
    let chunk = {};
    await axios.put(API_URL + `/update/${id}`, data)
      .then((response) => { chunk = response })
      .catch(() => { this.serverDown() });
    return chunk;
  }
};