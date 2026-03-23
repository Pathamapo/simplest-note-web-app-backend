# --- Stage 1: Build Frontend (Vite/Vue) ---
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# 1. ประกาศรับค่าจาก --build-arg ใน node.js.yml
ARG VUE_APP_API_URL

# 2.ให้ ENV ใช้ค่าจาก ARG แทนการเขียนเลขพอร์ตตายตัว
ENV VUE_APP_API_URL=${VUE_APP_API_URL}

# 3. สั่ง Build หน้าเว็บ
RUN npm run build

# --- Stage 2: Serve using Nginx ---
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]