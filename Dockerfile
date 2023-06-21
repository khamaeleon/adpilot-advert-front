# 1. node 이미지 사용
FROM node:16-alpine

# set the working direction
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN yarn install
RUN npm install -g react-scripts

COPY . /app

# run your app
CMD ["yarn", "run", "start"]

