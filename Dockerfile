# Use an official Node.js runtime as a parent image
FROM node:20.9.0-alpine3.18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Install Vite globally to make it available in the PATH
RUN npm install -g vite@latest

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run your app
CMD ["npm", "run", "preview"]
