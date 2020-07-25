FROM node:14.5.0-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

CMD [ "npm", "start" ]
