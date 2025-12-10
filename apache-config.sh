#!/bin/bash

sed -i "s/Listen 80/Listen $PORT/g" /etc/apache2/ports.conf
sed -i "s/80/$PORT/g" /etc/apache2/sites-available/000-default.conf

# Enable .htaccess nếu có (AllowOverride All)
echo "<Directory /var/www/html>
    AllowOverride All
    Require all granted
</Directory>" > /etc/apache2/sites-available/000-default.conf

# Start Apache
exec "$@"