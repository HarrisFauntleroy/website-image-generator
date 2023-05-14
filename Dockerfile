FROM node:16.17.0-bullseye-slim

RUN apt-get update && apt-get install -y libnss3 chromium

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

ENV NODE_ENV production

RUN yarn build

EXPOSE 8080

USER node
CMD [ "node", "dist/index.js" ]
