FROM serversideup/php:8.4-fpm-nginx AS base

LABEL maintainer="ObladenMedia <do@obladen.media>"
LABEL org.opencontainers.image.source="https://github.com/OuPDO/OMNIPULSE"

ENV PHP_OPCACHE_ENABLE=1
ENV PHP_OPCACHE_VALIDATE_TIMESTAMPS=0

# Install intl extension (pdo_pgsql + redis already included in image)
USER root
RUN install-php-extensions intl
USER www-data

WORKDIR /var/www/html

# --- Dependencies ---
FROM base AS deps
USER root
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist
USER www-data

# --- Application ---
FROM base AS app

USER root
COPY --from=deps /var/www/html/vendor ./vendor
COPY . .

RUN composer dump-autoload --optimize --no-dev \
    && php artisan view:cache \
    && chown -R www-data:www-data storage bootstrap/cache

USER www-data

EXPOSE 8080
