FROM node:18-alpine

# Install system dependencies (if your tests need a browser)
RUN apk update && apk add --no-cache \
    chromium \
    chromium-chromedriver \
    udev \
    ttf-freefont \
    bash \
    curl \
    git \
    && rm -rf /var/cache/apk/*

# Set environment variables for Chrome
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROMEDRIVER_BIN=/usr/bin/chromedriver

# App root
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./

# Install npm dependencies
RUN npm ci && npm install -g appium mocha

# Copy source code
COPY . .

# Expose Appium port (optional)
EXPOSE 4723

CMD ["sh"]
