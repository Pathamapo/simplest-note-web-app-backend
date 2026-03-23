# --- Stage 1: Build Frontend (Vite/Vue) ---
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG VUE_APP_API_URL
ENV VUE_APP_API_URL=${VUE_APP_API_URL}

RUN npm run build


# --- Stage 2: Serve using Nginx ---
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
