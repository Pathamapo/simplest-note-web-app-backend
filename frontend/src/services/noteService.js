import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || "http://10.5.3.213/api/notes";
console.log("NEW VERSION TEST 123"); // 👈 ใส่ตรงนี้
export default {
  serverDown() {
    alert("Can't connect to the server");
  },

  async getAllNotes() {
    try {
      const response = await axios.get(`${API_URL}/getall`);
      return response.data;
    } catch {
      this.serverDown();
    }
  },

  async addNote(data) {
    try {
      const response = await axios.post(`${API_URL}/add`, data);
      return response.data;
    } catch {
      this.serverDown();
    }
  },

  async deleteNote(id) {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      return response.data;
    } catch {
      this.serverDown();
    }
  },

  async getNoteById(id) {
    try {
      const response = await axios.get(`${API_URL}/get/${id}`);
      return response.data;
    } catch {
      this.serverDown();
    }
  },

  async updateNoteById(id, data) {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, data);
      return response.data;
    } catch {
      this.serverDown();
    }
  }
};