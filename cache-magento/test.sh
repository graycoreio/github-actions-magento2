#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT="$SCRIPT_DIR/compute-cache-keys.sh"
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

# Default cache key
OUT=$(bash "$SCRIPT" "_mageos" "8.3.0" "2.2.6")
assert_eq "default: download-key" \
  "composer | v5.8 | _mageos | 2.2.6 | 8.3.0" \
  "$(field "$OUT" download-key)"

# Custom composer_cache_key
OUT=$(bash "$SCRIPT" "custom-v2" "8.1.5" "2.4.2")
assert_eq "custom key: download-key" \
  "composer | v5.8 | custom-v2 | 2.4.2 | 8.1.5" \
  "$(field "$OUT" download-key)"

echo ""
echo "$PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ]
