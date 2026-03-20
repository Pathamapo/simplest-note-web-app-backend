# --- Stage 1: Build Frontend (Vite) ---
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# ก๊อปปี้ .env.example ไปเป็น .env เพื่อให้ Vite อ่านตัวแปร VITE_API_URL
# *ต้าต้องสร้างไฟล์ frontend/.env ที่มีค่า VITE_API_URL ในเครื่องนายก่อนรัน*
COPY .env.example .env

# สั่ง Build หน้าเว็บ (Vite จะเอาตัวแปร VITE_API_URL ฝังลงในไฟล์ JS ที่ได้)
RUN npm run build

# --- Stage 2: Serve using Nginx ---
# ใช้ Nginx (Alpine) เพื่อประหยัดพื้นที่
FROM nginx:alpine

# ก๊อปปี้ไฟล์หน้าเว็บที่ Build เสร็จแล้ว (ปกติจะอยู่ในโฟลเดอร์ dist ของ Vite)
COPY --from=build /app/dist /usr/share/nginx/html

# เปิดพอร์ต 80 (พอร์ตมาตรฐานของ Nginx)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]