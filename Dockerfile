# 1. node 이미지 사용
FROM node:16-alpine

# set the working direction
WORKDIR /app

COPY package.json ./

RUN yarn install
RUN npm install -g react-scripts

COPY . /app

# run your app
CMD ["yarn", "run", "start"]

