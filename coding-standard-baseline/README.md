# Magento 2 Coding Standard Action

A Github Action that runs the Magento Coding Standard.

## Inputs

See the [action.yml](./action.yml)

## Usage

```yml
name: Coding Standard baseline

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

jobs:
  coding-standard:
    runs-on: ubuntu-latest
    steps:
    - uses: mage-os/github-actions/coding-standard-baseline@main
      with:
        php_version: "8.1" # Optional, will be used for Php version
        composer_version: "2"
        version: "31" # Optional, will use the latest if omitted.
        severity: "8" # Optional, will use phpcs default of 5 if not specified.
        warning_severity: "4" # Optional, will use warning severity value if not specified.
        error_severity: "7" # Optional, will use error severity value if not specified.
        baseline_version: "1.1.2" # Optional, will use for php codesniffer baseline version
```
