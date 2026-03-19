FROM serversideup/php:8.4-fpm-nginx AS base

LABEL maintainer="ObladenMedia <do@obladen.media>"
LABEL org.opencontainers.image.source="https://github.com/OuPDO/OMNIPULSE"

ENV PHP_OPCACHE_ENABLE=1
ENV PHP_OPCACHE_VALIDATE_TIMESTAMPS=0

# Install PHP extensions required by Laravel + Filament
RUN install-php-extensions pdo_pgsql redis intl

WORKDIR /var/www/html

# --- Dependencies ---
FROM base AS deps
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# --- Application ---
FROM base AS app

COPY --from=deps /var/www/html/vendor ./vendor
COPY . .

RUN composer dump-autoload --optimize --no-dev \
    && php artisan view:cache \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8080
