FROM node:20

WORKDIR /app/backend

COPY package.json .
COPY package-lock.json .

RUN npm install -g pnpm && pnpm install
COPY . .
