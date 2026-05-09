#!/usr/bin/env bash
# Args: composer_cache_key php_version composer_version
COMPOSER_CACHE_KEY="$1"
PHP_VERSION="$2"
COMPOSER_VERSION="$3"

echo "download-key=composer | v5.8 | ${COMPOSER_CACHE_KEY} | ${COMPOSER_VERSION} | ${PHP_VERSION}"
