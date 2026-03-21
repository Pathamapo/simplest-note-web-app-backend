<template>
  <nav>
    <router-link :to="'/'" class="note-app">Note App</router-link>
    <button type="submit" @click="updateNote()" :disabled="isButtonDisabled">Save</button>
  </nav>
  <div class="form_wrap">
    <form @submit.prevent="updateNote" id="noteForm">
      <input v-model="title" placeholder="Title" required @keydown="handleKeyDown" />
      <span class="date">{{ this.date }}</span>
      <textarea ref="expandingTextarea" v-model="text" @input="autoExpand" placeholder="Text" required
        @keydown="handleKeyDown"></textarea>
    </form>
  </div>
</template>
  
<script>
import noteService from '@/services/noteService';

export default {
  props: ['id'],
  data() {
    return {
      title: '',
      text: '',
      date: '',
    };
  },
  async mounted() {
    await this.fetchNoteData();
    this.autoExpand();
  },
  methods: {
    async fetchNoteData() {
      try {
        const response = await noteService.getNoteById(this.id);
        // เช็คว่าข้อมูลส่งกลับมาเป็น Array หรือ Object
        const note = Array.isArray(response.data) ? response.data[0] : response.data;

        if (note) {
          // 1. จัดการเรื่องวันที่ (ใส่ Try-Catch กันพังถ้าไม่มี date)
          if (note.date) {
            const localDate = new Date(note.date);
            this.date = localDate.toLocaleString("ru-RU");
          } else {
            this.date = "No date available"; // กรณีไม่มีวันที่ในฐานข้อมูล
          }

          // 2. Map ข้อมูลลงตัวแปร (เช็คชื่อฟิลด์ให้ตรงกับ Database)
          // ถ้าใน DB ใช้ 'content' ให้เปลี่ยน 'text' เป็น 'content' นะครับ
          this.title = note.title || '';
          this.text = note.text || note.content || ''; 
          
          // เก็บค่าเก่าไว้เทียบปุ่ม Disable
          this.old_title = this.title;
          this.old_text = this.text;
        }
      } catch (error) {
        console.error('Error fetching note data:', error);
        alert("ไม่สามารถโหลดข้อมูลโน้ตได้");
      }
    },
    async updateNote() {
      try {
        const updatedNote = [this.title, this.text];
        await noteService.updateNoteById(this.id, updatedNote);
        this.$router.push('/');
      } catch (error) {
        console.error('Error updating note:', error);
      }
    },
    async autoExpand() {
      this.$refs.expandingTextarea.style.height = 'auto';
      this.$refs.expandingTextarea.style.height = this.$refs.expandingTextarea.scrollHeight + 'px';
    },
    async handleKeyDown(event) {
      if (event.ctrlKey && event.key === "Enter") {
        this.updateNote();
      }
    },
  },
  computed: {
    isButtonDisabled() {
      return this.title.trim() === '' || this.text.trim() === '' || (this.text === this.old_text && this.title === this.old_title);
    },
  },
};
</script>
  
<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #202021;
}

.note-app {
  color: #dbdddf;
  font-size: 1.5em;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
}

.form_wrap {
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 70%;
}

input {
  margin: 50px 0;
  height: 40px;
  width: 100%;
  background-color: transparent;
  font-size: 32px;
  font-weight: 700;
  color: #dbdddf;
}

.date {
  font-size: 13px;
  font-weight: 700;
  position: relative;
  top: -50px;
  color: #6a6a6a;
}

textarea {
  padding: 0 0 30px 0;
  width: 100%;
  font-size: 16px;
  color: #dbdddf;
  background-color: transparent;
  resize: none;
  overflow: hidden;
}

button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #29292b;
  color: #dbdddf;
  text-decoration: none;
  border: none;
  font-weight: bold;
  font-size: 16px;
  border-radius: 4px;
  transition: .2s;
  cursor: pointer;
}

button:hover {
  color: #29292b;
  background-color: #dbdddf;
}

button:disabled {
  background-color: #202021;
  color: #cfcfcf;
  cursor: not-allowed;
}

@media (max-width: 425px) {
  form {
    width: 90%;
  }
}
</style>