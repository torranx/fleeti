# Use the official Node.js 20 LTS image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the root-level tsconfig.base.json file into the container
COPY tsconfig.base.json /tsconfig.base.json

# Copy the package.json and package-lock.json files from the frontend directory
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend application code
COPY frontend/ .

# Expose the port
EXPOSE 3000

# Build the Next.js application
RUN npm run build

# Set the environment variable
ARG NODE_ENV
ENV NODE_ENV=${APP_ENV}

# Start the Next.js application conditionally
CMD if [ "$APP_ENV" = "development" ]; then npm run dev; else npm start; fi