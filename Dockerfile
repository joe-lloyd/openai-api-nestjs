# Use the Node.js 20 image as the base
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (to leverage Docker's caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Expose the app's port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
