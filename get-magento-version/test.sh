#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT="$SCRIPT_DIR/get-magento-version.sh"
FIXTURES="$SCRIPT_DIR/fixtures"
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

OUT=$(bash "$SCRIPT" "$FIXTURES/store-lock")
assert_eq "store lock: version"                   '"2.4.7"'                           "$(field "$OUT" version)"
assert_eq "store lock: project"                   "magento/project-community-edition" "$(field "$OUT" project)"
assert_eq "store lock: supported_version_project" "magento-open-source"               "$(field "$OUT" supported_version_project)"

OUT=$(bash "$SCRIPT" "$FIXTURES/store-v-prefix")
assert_eq "store v-prefix: version" '"2.4.6"' "$(field "$OUT" version)"

OUT=$(bash "$SCRIPT" "$FIXTURES/enterprise")
assert_eq "enterprise: version"                   '"2.4.7-p1"'                         "$(field "$OUT" version)"
assert_eq "enterprise: project"                   "magento/project-enterprise-edition" "$(field "$OUT" project)"
assert_eq "enterprise: supported_version_project" "magento-open-source"                "$(field "$OUT" supported_version_project)"

OUT=$(bash "$SCRIPT" "$FIXTURES/mage-os")
assert_eq "mage-os: version"                   '"1.0.0"'                         "$(field "$OUT" version)"
assert_eq "mage-os: project"                   "mage-os/project-community-edition" "$(field "$OUT" project)"
assert_eq "mage-os: supported_version_project" "mage-os"                           "$(field "$OUT" supported_version_project)"

OUT=$(bash "$SCRIPT" "$FIXTURES/mage-os-minimal")
assert_eq "mage-os-minimal: version"                   '"3.0.0"'                           "$(field "$OUT" version)"
assert_eq "mage-os-minimal: project"                   "mage-os/project-minimal-edition" "$(field "$OUT" project)"
assert_eq "mage-os-minimal: supported_version_project" "mage-os-minimal"                 "$(field "$OUT" supported_version_project)"

OUT=$(bash "$SCRIPT" "$FIXTURES/store-json")
assert_eq "store json: version"                   '"2.4.6-p1"'                       "$(field "$OUT" version)"
assert_eq "store json: project"                   "magento/project-community-edition" "$(field "$OUT" project)"
assert_eq "store json: supported_version_project" "magento-open-source"               "$(field "$OUT" supported_version_project)"

OUT=$(bash "$SCRIPT" "$FIXTURES/extension")
assert_eq "extension: version"                   '""' "$(field "$OUT" version)"
assert_eq "extension: project"                   ""   "$(field "$OUT" project)"
assert_eq "extension: supported_version_project" ""   "$(field "$OUT" supported_version_project)"

OUT=$(bash "$SCRIPT" "$FIXTURES/empty")
assert_eq "empty dir: version"                   '""' "$(field "$OUT" version)"
assert_eq "empty dir: project"                   ""   "$(field "$OUT" project)"
assert_eq "empty dir: supported_version_project" ""   "$(field "$OUT" supported_version_project)"

echo ""
echo "$PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ]
