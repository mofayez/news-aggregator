FROM php:8.2-fpm

ARG user
ARG uid

# Debug: Print the values of user and uid
RUN echo "User: ${user}, UID: ${uid}"

# Install necessary dependencies
RUN apt update && apt install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    default-mysql-client \
    && apt clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Copy Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create user and set permissions
RUN useradd -G www-data,root -u ${uid} -d /home/${user} ${user} \
    && mkdir -p /home/${user}/.composer \
    && chown -R ${user}:${user} /home/${user}

# Set working directory
WORKDIR /var/www

# Copy application files
COPY . .

# Copy entrypoint and wait-for-db scripts
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
COPY wait-for-db.sh /usr/local/bin/wait-for-db.sh
RUN chmod +x /usr/local/bin/entrypoint.sh /usr/local/bin/wait-for-db.sh

# Set permissions for /var/www
RUN chown -R ${user}:${user} /var/www

USER ${user}