# Use the official PHP image with Apache
FROM php:8.3-apache

# copy all codes to root directory of apache
COPY . /var/www/html/

# Grant permissions to Apache
RUN chown -R www-data:www-data /var/www/html \
    && a2enmod rewrite

# Cloud Run requires using port 8080 instead of 80
ENV PORT 8080
EXPOSE 8080

# small script to make Apache listen on port 8080
RUN sed -i 's/80/$PORT/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf