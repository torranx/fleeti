# Use the official Node.js 20 LTS image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the root-level tsconfig.base.json file into the container
COPY tsconfig.base.json /tsconfig.base.json

# Copy the backend package.json and package-lock.json files into the container
COPY backend/package*.json ./

# Install dependencies for the backend
RUN npm install

# Copy the rest of the backend application code
COPY backend/ .

# Expose the port the app will run on
EXPOSE 3001

# Start the backend server
CMD ["npm", "run", "dev"]