FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE $PORT

CMD npm run preview -- --host 0.0.0.0 --port $PORT
