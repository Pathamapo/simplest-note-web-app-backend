# --- Stage 1: Build Frontend (Vite) ---
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# รับค่า VITE_API_URL จาก build-arg
ARG VUE_APP_API_URL
ENV VUE_APP_API_URL=http://10.5.3.213:30001/api/notes

# Build หน้าเว็บ
RUN npm run build

# --- Stage 2: Serve using Nginx ---
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]