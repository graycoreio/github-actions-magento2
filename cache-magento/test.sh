#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT="$SCRIPT_DIR/compute-cache-keys.sh"
SCRIPT_STAMP="$SCRIPT_DIR/compute-stamp-paths.sh"
LOCK_HASH=$(sha256sum "$SCRIPT_DIR/fixtures/composer.lock" | cut -d' ' -f1)
PASS=0
FAIL=0

assert_eq() {
  local label="$1" expected="$2" actual="$3"
  if [ "$expected" = "$actual" ]; then
    echo "PASS: $label"
    PASS=$((PASS + 1))
  else
    echo "FAIL: $label"
    echo "  expected: $expected"
    echo "  actual:   $actual"
    FAIL=$((FAIL + 1))
  fi
}

field() {
  echo "$1" | grep "^${2}=" | cut -d= -f2-
}

# Extension mode: no project resolved, mode derived as "extension", no lock suffix
OUT=$(bash "$SCRIPT" "_mageos" "Linux" "8.3.0" "2.2.6" "" "")
assert_eq "extension: download-key" \
  "composer | v5.8 | Linux | extension | _mageos | 2.2.6 | 8.3.0" \
  "$(field "$OUT" download-key)"
assert_eq "extension: download-restore-key" \
  "composer | v5.8 | Linux | extension | _mageos | 2.2.6 | 8.3.0" \
  "$(field "$OUT" download-restore-key)"
assert_eq "extension: stamp-key" \
  "composer | stamp | v5.8 | Linux | extension | _mageos | 2.2.6 | 8.3.0" \
  "$(field "$OUT" stamp-key)"

# Store mode: project resolved, mode derived as "store", lock hash appended (restore-key drops lock for prefix match)
OUT=$(bash "$SCRIPT" "_mageos" "Linux" "8.3.0" "2.2.6" "magento/project-community-edition" "$LOCK_HASH")
assert_eq "store: download-key" \
  "composer | v5.8 | Linux | store | _mageos | 2.2.6 | 8.3.0 | $LOCK_HASH" \
  "$(field "$OUT" download-key)"
assert_eq "store: download-restore-key" \
  "composer | v5.8 | Linux | store | _mageos | 2.2.6 | 8.3.0" \
  "$(field "$OUT" download-restore-key)"
assert_eq "store: stamp-key" \
  "composer | stamp | v5.8 | Linux | store | _mageos | 2.2.6 | 8.3.0 | $LOCK_HASH" \
  "$(field "$OUT" stamp-key)"

# Store mode without composer.lock (e.g. stamp=false on a store before `composer install`):
# lock_hash is empty, so keys must not carry a trailing " | " with an empty hash slot.
OUT=$(bash "$SCRIPT" "_mageos" "Linux" "8.3.0" "2.2.6" "magento/project-community-edition" "")
assert_eq "store no-lock: download-key" \
  "composer | v5.8 | Linux | store | _mageos | 2.2.6 | 8.3.0" \
  "$(field "$OUT" download-key)"
assert_eq "store no-lock: download-restore-key" \
  "composer | v5.8 | Linux | store | _mageos | 2.2.6 | 8.3.0" \
  "$(field "$OUT" download-restore-key)"
assert_eq "store no-lock: stamp-key" \
  "composer | stamp | v5.8 | Linux | store | _mageos | 2.2.6 | 8.3.0" \
  "$(field "$OUT" stamp-key)"

# Custom composer_cache_key, no project resolved
OUT=$(bash "$SCRIPT" "custom-v2" "Linux" "8.1.5" "2.4.2" "" "")
assert_eq "custom key: download-key" \
  "composer | v5.8 | Linux | extension | custom-v2 | 2.4.2 | 8.1.5" \
  "$(field "$OUT" download-key)"
assert_eq "custom key: download-restore-key" \
  "composer | v5.8 | Linux | extension | custom-v2 | 2.4.2 | 8.1.5" \
  "$(field "$OUT" download-restore-key)"
assert_eq "custom key: stamp-key" \
  "composer | stamp | v5.8 | Linux | extension | custom-v2 | 2.4.2 | 8.1.5" \
  "$(field "$OUT" stamp-key)"

# Stamp paths: no excludes — base paths only, with magento2-base always excluded
OUT=$(bash "$SCRIPT_STAMP" "/work" "")
EXPECTED="/work/vendor/**
!/work/vendor/**/
!/work/vendor/magento/magento2-base
!/work/vendor/magento/magento2-base/**
!/work/vendor/mage-os/magento2-base
!/work/vendor/mage-os/magento2-base/**"
assert_eq "stamp paths: no excludes" "$EXPECTED" "$OUT"

# Stamp paths: single exclude appended after the always-excluded base entries
OUT=$(bash "$SCRIPT_STAMP" "/work" "magento/module-foo")
EXPECTED="/work/vendor/**
!/work/vendor/**/
!/work/vendor/magento/magento2-base
!/work/vendor/magento/magento2-base/**
!/work/vendor/mage-os/magento2-base
!/work/vendor/mage-os/magento2-base/**
!/work/vendor/magento/module-foo
!/work/vendor/magento/module-foo/**"
assert_eq "stamp paths: single exclude" "$EXPECTED" "$OUT"

# Stamp paths: multiple excludes, with whitespace and blank lines tolerated
OUT=$(bash "$SCRIPT_STAMP" "/work" "$(printf 'magento/module-foo\n  magento/module-bar  \n\nvendor/pkg-baz\n')")
EXPECTED="/work/vendor/**
!/work/vendor/**/
!/work/vendor/magento/magento2-base
!/work/vendor/magento/magento2-base/**
!/work/vendor/mage-os/magento2-base
!/work/vendor/mage-os/magento2-base/**
!/work/vendor/magento/module-foo
!/work/vendor/magento/module-foo/**
!/work/vendor/magento/module-bar
!/work/vendor/magento/module-bar/**
!/work/vendor/vendor/pkg-baz
!/work/vendor/vendor/pkg-baz/**"
assert_eq "stamp paths: multiple excludes with whitespace and blank lines" "$EXPECTED" "$OUT"

echo ""
echo "$PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ]
