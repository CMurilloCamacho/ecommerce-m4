FROM node:latest AS build

WORKDIR /app

COPY ./package.json ./package-lock.json ./




COPY . .
RUN npm install
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]