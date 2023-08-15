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
        php_version: "8.2"
        composer_version: "2"
        version: "*"
        severity: "5"
        warning_severity: "8"
        error_severity: "8"
        baseline_version: "*"
```
