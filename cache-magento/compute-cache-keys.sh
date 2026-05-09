#!/usr/bin/env bash
# Args: composer_cache_key os php_version composer_version
COMPOSER_CACHE_KEY="$1"
OS="$2"
PHP_VERSION="$3"
COMPOSER_VERSION="$4"

echo "download-key=composer | v5.8 | ${OS} | ${COMPOSER_CACHE_KEY} | ${COMPOSER_VERSION} | ${PHP_VERSION}"
