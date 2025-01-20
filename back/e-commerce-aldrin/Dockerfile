FROM node:latest AS build

WORKDIR /app

COPY ./package.json ./package-lock.json ./


COPY . ./
RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]