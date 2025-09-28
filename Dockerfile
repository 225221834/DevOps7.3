FROM node:current-alpine

# Add dependencies
RUN apk add --no-cache \
    bash \
    chromium \
    chromium-chromedriver \
    curl \
    git \
    ttf-freefont \
    udev \
    && rm -rf /var/cache/apk/*

# Set env vars for Chrome
ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROMEDRIVER_BIN=/usr/bin/chromedriver

# Set working dir and install
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm install -g appium mocha
COPY . .

# Expose default Appium port
EXPOSE 4723
