#!/usr/bin/env bash
# Args: working_directory exclude_from_stamp
# working_directory: absolute path (caller is responsible for realpath resolution)
# exclude_from_stamp: newline-separated list of composer package names to exclude
WORKING_DIR="$1"
EXCLUDE_FROM_STAMP="${2:-}"
VENDOR="${WORKING_DIR}/vendor"

PATHS="${VENDOR}/**"$'\n'"!${VENDOR}/**/"$'\n'"!${VENDOR}/magento/magento2-base"$'\n'"!${VENDOR}/magento/magento2-base/**"$'\n'"!${VENDOR}/mage-os/magento2-base"$'\n'"!${VENDOR}/mage-os/magento2-base/**"

while IFS= read -r pkg; do
  pkg="${pkg#"${pkg%%[![:space:]]*}"}"
  pkg="${pkg%"${pkg##*[![:space:]]}"}"
  [[ -z "$pkg" ]] && continue
  PATHS="${PATHS}"$'\n'"!${VENDOR}/${pkg}"$'\n'"!${VENDOR}/${pkg}/**"
done <<< "$EXCLUDE_FROM_STAMP"

echo "$PATHS"
