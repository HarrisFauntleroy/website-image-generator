# Start from the official Node.js Docker image
FROM node:16

RUN apt-get update && apt-get install -y libnss3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]
