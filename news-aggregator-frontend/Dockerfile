# Stage 1: Build the React app
FROM node:18 AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy the built app from the previous stage
COPY --from=build /app/dist .

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]