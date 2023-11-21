# Use an official Node.js runtime as a parent image
FROM node:14.16.0-alpine3.13

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Define the command to run your app
CMD ["npm", "run", "dev"]
