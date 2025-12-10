# Use the official PHP image with Apache
FROM php:8.3-apache

# Copy all code to the web root directory of Apache
COPY . /var/www/html/

# Grant permissions to Apache
RUN chown -R www-data:www-data /var/www/html \
    && a2enmod rewrite

# Create VirtualHost config for Apache to listen on the correct PORT (Cloud Run will set PORT=8080)
RUN echo "<VirtualHost *:${PORT}> \
    ServerAdmin webmaster@localhost \
    DocumentRoot /var/www/html \
    <Directory /var/www/html> \
        Options Indexes FollowSymLinks \
        AllowOverride All \
        Require all granted \
    </Directory> \
    ErrorLog \${APACHE_LOG_DIR}/error.log \
    CustomLog \${APACHE_LOG_DIR}/access.log combined \
</VirtualHost>" > /etc/apache2/sites-available/000-default.conf \
    && sed -i 's/Listen 80/Listen ${PORT}/g' /etc/apache2/ports.conf

# Set the PORT environment variable and expose the port
ENV PORT 8080
EXPOSE 8080