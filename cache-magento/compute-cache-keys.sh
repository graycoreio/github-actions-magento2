#!/usr/bin/env bash
# Args: composer_cache_key os php_version composer_version project lock_hash
COMPOSER_CACHE_KEY="$1"
OS="$2"
PHP_VERSION="$3"
COMPOSER_VERSION="$4"
PROJECT="$5"
LOCK_HASH="${6:-}"

MODE="extension"
SUFFIX=""
if [ -n "$PROJECT" ]; then
  MODE="store"
  [ -n "$LOCK_HASH" ] && SUFFIX=" | $LOCK_HASH"
fi

BASE="composer | v5.8 | ${OS} | ${MODE} | ${COMPOSER_CACHE_KEY} | ${COMPOSER_VERSION} | ${PHP_VERSION}"
echo "download-key=${BASE}${SUFFIX}"
echo "download-restore-key=${BASE}"
echo "stamp-key=composer | stamp | v5.8 | ${OS} | ${MODE} | ${COMPOSER_CACHE_KEY} | ${COMPOSER_VERSION} | ${PHP_VERSION}${SUFFIX}"
