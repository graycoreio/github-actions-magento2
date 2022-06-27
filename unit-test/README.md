# Magento 2 Unit Test Action

A Github Action that runs the Unit Tests of a Magento Package

## Inputs

See the [action.yml](./action.yml)

## Usage

```yml
name: Unit Test

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

jobs:
  unit-test:
    strategy:
      matrix:
        php_version:
          - 7.4
          - 8.1
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: graycoreio/github-actions-magento2/unit-test@main
      with:
        php_version: ${{ matrix.php_version }}
```
