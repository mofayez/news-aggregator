#!/bin/sh

# Debug: Print environment variables
echo "DB_PASSWORD: ${DB_PASSWORD}"
echo "DB_USERNAME: ${DB_USERNAME}"
echo "DB_DATABASE: ${DB_DATABASE}"

# Wait for the MySQL database to be ready
until mysql -h db -u ${DB_USERNAME} -p${DB_PASSWORD} -e 'SELECT 1' > /dev/null 2>&1; do
  echo "Waiting for MySQL to be ready..."
  sleep 1
done

echo "MySQL is ready! Starting Application..."