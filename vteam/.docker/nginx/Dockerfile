FROM nginx:latest

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom config
COPY conf.d /etc/nginx/conf.d

# Static files served from /usr/share/nginx/html
# (build-mappen mountas via docker-compose)
