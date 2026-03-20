# ใช้ Node.js เวอร์ชั่น LTS (18) เป็น Base Image
FROM node:18-alpine

# กำหนดโฟลเดอร์ทำงานใน Container
WORKDIR /app

# ก๊อปปี้ไฟล์ package.json เพื่อลง dependencies
COPY package*.json ./

# ลง Library ทั้งหมด (แบบ Production เพื่อประหยัดพื้นที่)
RUN npm install --only=production

# ก๊อปปี้โค้ดทั้งหมด (src, .env.example, etc.)
COPY . .

# เปิดพอร์ต 3000
EXPOSE 3000

# คำสั่งสำหรับรัน Backend (อ้างอิงจาก package.json script)
CMD ["npm", "start"]