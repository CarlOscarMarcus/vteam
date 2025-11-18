FROM ubuntu:latest

# Create app directory
WORKDIR /app

# Update package lists and install basic utilities
RUN apt-get update && apt-get install -y \
    curl \
    git \
    nginx \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Copy SSL certificates into the container
COPY ssl/server.crt /etc/ssl/certs/server.crt
COPY ssl/server.key /etc/ssl/private/server.key

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
