# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the server and client folders from the host to the working directory in the container
COPY server /app/server
COPY client /app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies for both server and client
RUN npm install

# Set working directory to client
WORKDIR /app/client

# Build the React client
RUN chown root.root .  # make sure root own the directory before installing Sharp
RUN npm run build

# Copy the dist directory to the server/dist
RUN cp -r /app/client/dist /app/server/dist

# Remove the client folder
RUN rm -rf /app/client

# Reset working directory to app root
WORKDIR /app

# Install ffmpeg and ping
RUN apt-get update && apt-get install -y ffmpeg iputils-ping arp-scan

# Setup
RUN npm run setup

# Expose the port on which your Node.js app will run
EXPOSE 8000

# Start the Node.js app
CMD ["npm", "run", "server"]
