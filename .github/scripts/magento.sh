#!/usr/bin/env bash

WORKSPACE="$GITHUB_WORKSPACE"
RUNNER_PATH="$1"
CONTAINER_ID="$2"

RELATIVE=$(realpath --relative-to="$WORKSPACE" \
    "$(realpath "$RUNNER_PATH")")

CONTAINER_PATH="/var/www/html/$RELATIVE"

magento() {
    docker exec \
        -w "$CONTAINER_PATH" \
        "$CONTAINER_ID" \
        php bin/magento "$@"
}