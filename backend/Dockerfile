# Use the official Node.js 20 LTS image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the root-level tsconfig.base.json file into the container
COPY tsconfig.base.json /tsconfig.base.json

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Expose the port the app will run on
EXPOSE 3001

# Start the server
CMD ["npm", "run", "dev"]