# Step 1: Use Node.js image
FROM node:23

# Step 2: Set working directory
WORKDIR /usr/src/app

# Step 3: Copy package files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the code
COPY . .

# Step 6: Build the React app using Vite
RUN npm run build

# Step 7: Install a simple server to serve the build files (e.g., serve)
RUN npm install -g serve

# Step 8: Expose the app on port 5000
EXPOSE 5000

# Step 9: Serve the build
CMD ["serve", "-s", "dist", "-l", "5000"]
