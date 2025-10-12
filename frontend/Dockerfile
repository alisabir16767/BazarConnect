# Use Node.js 20 LTS
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

# Build Next.js project
RUN npm run build

# Expose port for Next.js
EXPOSE 3000

# Start Next.js production server
CMD ["npm", "start"]
