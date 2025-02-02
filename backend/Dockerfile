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

# Step 6: Build the app
RUN npm run build

# Step 7: Expose the app on port 3000
EXPOSE 3000

# Step 8: Start the app
CMD ["npm", "run", "start:prod"]
