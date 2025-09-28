FROM node:current-alpine

# Install dependencies needed for Appium
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

# Create shared node_modules directory outside of /app
WORKDIR /opt/app
COPY package*.json ./
RUN npm ci

# Copy app code into /app
WORKDIR /app
COPY . .

# Link installed deps from /opt/app
RUN ln -s /opt/app/node_modules node_modules

# Optional default command
CMD ["npm", "test"]
