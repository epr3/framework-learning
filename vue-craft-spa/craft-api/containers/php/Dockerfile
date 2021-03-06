FROM php:7.4-fpm

RUN apt-get update && apt-get install -y \
  libfreetype6-dev libjpeg62-turbo-dev \
  libmcrypt-dev libpng-dev libbz2-dev \
  libssl-dev autoconf \
  ca-certificates curl g++ libicu-dev libzip-dev

RUN docker-php-ext-install \
  bcmath bz2 exif \
  ftp gd gettext opcache \
  shmop sockets sysvmsg sysvsem sysvshm \
  zip iconv pdo_mysql intl

RUN docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/

RUN apt-get install -y --no-install-recommends libmagickwand-dev && \
  pecl install imagick && \
  docker-php-ext-enable imagick

RUN echo "upload_max_filesize = 10M" > /usr/local/etc/php/php.ini && \
  echo "post_max_size = 10M" >> /usr/local/etc/php/php.ini && \
  echo "max_execution_time = 300" >> /usr/local/etc/php/php.ini && \
  echo "memory_limit = 256M" >> /usr/local/etc/php/php.ini

COPY --chown=www-data:www-data ./src/config /var/www/html/config
COPY --chown=www-data:www-data ./src/modules /var/www/html/modules
COPY --chown=www-data:www-data ./src/templates /var/www/html/templates
COPY --chown=www-data:www-data ./src/web /var/www/html/web
COPY --chown=www-data:www-data ./src/composer.json /var/www/html/composer.json
COPY --chown=www-data:www-data ./src/craft /var/www/html/craft

RUN mkdir -p /var/www/html/storage/rebrand && \
  mkdir -p /var/www/html/storage/runtime/mutex && \
  mkdir -p /var/www/html/storage/logs && \
  chown -R www-data:www-data /var/www/html/storage

EXPOSE 9000