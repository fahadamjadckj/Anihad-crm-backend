
FROM node:20.18.0-alpine

WORKDIR /app

COPY package*.json ./
COPY db/ ./db
COPY dist/ ./dist/
COPY drizzle.config.ts ./
COPY drizzle/ ./drizzle/
COPY logs/ ./logs

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "container:start"]