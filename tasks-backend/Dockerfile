# Use the official Node.js image.
FROM node:18-alpine


# Create and set the working directory.
WORKDIR /src/main

# Copy package files and install dependencies.
COPY package*.json ./
RUN npm install

# Copy the rest of the application files.
COPY . .

# Build the TypeScript code.
RUN npm run build

# Expose the port the application will run on.
EXPOSE 3001

# Start the application.
CMD ["npm", "run", "start:prod"]