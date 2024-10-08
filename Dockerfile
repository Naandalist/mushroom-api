# Use the official Bun image
FROM oven/bun:1

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and bun.lockb
COPY package.json ./
COPY bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of app's source code
COPY . .

# Expose the port app runs on
EXPOSE 3000

# Run app
CMD ["bun", "run", "start"]