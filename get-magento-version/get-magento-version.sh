#!/usr/bin/env bash
set -uo pipefail

WORKING_DIR="${1:-.}"
PATTERN="magento/product-(community|enterprise)-edition|mage-os/product-(community|minimal)-edition"

cd "$WORKING_DIR"

if [ -f composer.lock ]; then
  RESULT=$(jq -r --arg p "$PATTERN" '.packages[] | select(.name | test($p)) | "\(.name) \(.version)"' composer.lock | head -1)
elif [ -f composer.json ]; then
  RESULT=$(jq -r --arg p "$PATTERN" '.require | to_entries[] | select(.key | test($p)) | "\(.key) \(.value)"' composer.json | head -1)
fi

PRODUCT=$(echo "${RESULT:-}" | awk '{print $1}')
VERSION=$(echo "${RESULT:-}" | awk '{print $2}' | sed 's/^v//')
PROJECT=$(echo "$PRODUCT" | sed 's/product-/project-/')

case "$PROJECT" in
  magento/*)                          SUPPORTED_VERSION_PROJECT="magento-open-source" ;;
  mage-os/project-community-edition)  SUPPORTED_VERSION_PROJECT="mage-os" ;;
  mage-os/project-minimal-edition)    SUPPORTED_VERSION_PROJECT="mage-os-minimal" ;;
  *)                                  SUPPORTED_VERSION_PROJECT="" ;;
esac

echo "version=\"$VERSION\""
echo "project=$PROJECT"
echo "supported_version_project=$SUPPORTED_VERSION_PROJECT"
