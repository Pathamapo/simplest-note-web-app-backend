FROM node:18-alpine
WORKDIR /app

# 1. ก๊อปไฟล์ config ก่อน
COPY package*.json ./
RUN npm install --only=production

# 2. ก๊อปปี้ทุกอย่าง รวมถึงโฟลเดอร์ src
COPY . .

# 3. เช็คให้ชัวร์ว่ามีไฟล์ index.js อยู่ใน src จริงๆ
# (เพิ่มบรรทัดนี้เพื่อ debug ตอน build ถ้าหาไม่เจอจะได้รู้ทันที)
RUN ls -R /app/src

EXPOSE 3000

# 4. สั่งรันตรงๆ ไม่ต้องผ่าน npm เพื่อลด layer ของ error
CMD ["node", "src/index.js"]