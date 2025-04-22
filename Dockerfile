FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma migrate dev --name init --skip-seed

RUN npm run dev

FROM node:22.14.0-slim

WORKDIR /app

COPY --from=builder /app ./

COPY .env .env

EXPOSE 3000

CMD ["npm", "start"]
