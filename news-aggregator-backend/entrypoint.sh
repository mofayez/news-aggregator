#!/bin/sh

# Wait for the MySQL database to be ready
echo "Waiting for database..."
/usr/local/bin/wait-for-db.sh

# Check if the migrations table exists
MIGRATIONS_TABLE_EXISTS=$(mysql -h db -u root -prootPass -D news_aggregator -e "SHOW TABLES LIKE 'migrations';" | grep migrations)

if [ -z "$MIGRATIONS_TABLE_EXISTS" ]; then
  # Migrations table does not exist, run migrations
  echo "Migrations table not found. Running migrations..."
  php artisan migrate --force
else
  # Migrations table exists, check if there are pending migrations
  PENDING_MIGRATIONS=$(php artisan migrate:status | grep "No" || true)

  if [ -n "$PENDING_MIGRATIONS" ]; then
    # There are pending migrations, run them
    echo "Pending migrations found. Running migrations..."
    php artisan migrate --force
  else
    # No pending migrations, skip
    echo "No pending migrations. Skipping migrations."
  fi
fi

# Clear Laravel cache
echo "Clearing cache..."
php artisan config:cache
php artisan cache:clear
php artisan route:cache

# execute the command fetch news
echo "Fetching news..."
php artisan news:fetch

# Start PHP-FPM
echo "Starting PHP-FPM..."
exec php-fpm