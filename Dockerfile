FROM node:current-alpine

RUN apk update && apk upgrade

WORKDIR /opt/app

COPY package*.json ./

RUN npm ci && \
	npm install -g appium mocha

WORKDIR /app
COPY . .

RUN ln -s /opt/app/node_modules /app/node_modules
