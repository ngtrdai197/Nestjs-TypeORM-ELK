FROM node:14-alpine

WORKDIR /nest-typeorm

COPY package*.json ./

RUN npm install && npm cache clean --force --loglevel=error

COPY . .

EXPOSE 8088

CMD [ "npm", "run", "start:dev"]
