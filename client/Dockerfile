FROM node:14.5.0-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/prd.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
