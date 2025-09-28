# Use Node.js base image for Appium/Mocha tests
FROM node:18-alpine

# Update Alpine packages to latest security patches
RUN apk update && apk upgrade

# Create folders for dependencies and app
WORKDIR /opt/app
COPY package*.json ./
RUN npm ci

# Now switch to the app directory
WORKDIR /app
COPY . .

# Symlink node_modules from build stage
RUN ln -s /opt/app/node_modules /app/node_modules

# Expose Appium default port (if needed)
EXPOSE 4723

# Default command
CMD ["sh"]
