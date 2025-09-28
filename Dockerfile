FROM node:current-alpine

# Install dependencies
RUN apk add --no-cache \
    bash \
    chromium \
    chromium-chromedriver \
    curl \
    g++ \
    make \
    python3 \
    ttf-freefont \
    udev

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the code
COPY . .

# Install Appium globally if needed
RUN npm install -g appium

# Expose ports if needed
EXPOSE 4723

CMD ["npm", "test"]
