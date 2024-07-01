# Dockerfile for React frontend
# Use an official node image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx when the container starts
CMD ["npm", "start"]
