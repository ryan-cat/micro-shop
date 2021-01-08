FROM node:alpine

WORKDIR /app
COPY package.json .
RUN apk add yarn
RUN yarn
COPY . .

CMD ["yarn", "start"]