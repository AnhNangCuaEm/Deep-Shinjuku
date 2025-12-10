# Use the official PHP image with Apache
FROM php:8.3-apache

COPY . /var/www/html/

COPY apache-config.sh /usr/local/bin/

RUN chown -R www-data:www-data /var/www/html \
    && a2enmod rewrite \
    && chmod +x /usr/local/bin/apache-config.sh

ENV PORT 8080
EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/apache-config.sh"]
CMD ["apache2-foreground"]