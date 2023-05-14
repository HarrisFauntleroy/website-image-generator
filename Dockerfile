FROM node:16.17.0-bullseye-slim

ENV NODE_ENV production

RUN apt-get update && apt-get install -y libnss3 chromium

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

USER node
CMD [ "node", "dist/index.js" ]
