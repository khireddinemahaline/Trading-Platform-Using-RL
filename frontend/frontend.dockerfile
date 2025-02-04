# Use the official Node.js image as the base image
FROM node:20.18.0 AS base

# Set the working directory inside the container
WORKDIR /app

# Install production dependencies first
COPY package*.json ./
RUN npm install 

# Copy the rest of the source code into the container
COPY . .

# Expose port 3000 to allow access to the Next.js app
EXPOSE 3000

# Build the app for production (optional if you want to use Next.js in static export mode)
# Uncomment the following line if you want to build the app during the Docker build phase
# RUN npm run build

# Start the Next.js application in development mode
CMD ["npm", "run", "dev"]

# If you want to use the app in production mode, replace the CMD line above with:
# CMD ["npm", "run", "start"]
