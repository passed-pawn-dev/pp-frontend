FROM node:alpine3.20 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine3.20-perl

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist/pp-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]