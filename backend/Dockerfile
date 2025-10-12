# Use Node.js 20 LTS
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend
CMD ["npm", "start"]
