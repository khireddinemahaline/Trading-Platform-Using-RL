# Use the official Node.js image as the base image
FROM node:20.18.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Generate Prisma Client
RUN npx prisma generate

# Push the Prisma schema to the database
#RUN npx prisma db push

# Start the application
CMD ["node", "src/server.js"]