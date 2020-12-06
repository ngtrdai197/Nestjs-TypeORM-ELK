FROM node:14-alpine

WORKDIR /typeorm-server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8088

CMD [ "npm", "run", "serve:dev"]