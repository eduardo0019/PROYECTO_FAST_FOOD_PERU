FROM php:8.2-fpm-alpine

RUN apk add --no-cache nginx supervisor libzip-dev oniguruma-dev \
    && docker-php-ext-install pdo_mysql mbstring zip \
    && rm -rf /var/cache/apk/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

COPY . .
RUN chown -R www-data:www-data storage bootstrap/cache \
    && mkdir -p /run/nginx

COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/start-container.sh /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container

EXPOSE 8080
CMD ["/usr/local/bin/start-container"]

