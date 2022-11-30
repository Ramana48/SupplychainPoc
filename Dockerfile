FROM node:14.4.0

WORKDIR /code

COPY package.json package.json

RUN yarn install

COPY . .

CMD [ "node", "dist/server.js" ]