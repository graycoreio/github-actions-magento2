# Magento 2 Static Test Action

A GitHub Action that runs the Static Tests of a Magento Package

## Inputs

See the [action.yml](./action.yml)

## Usage

```yml
name: Static Test

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

jobs:
  static-test:
    strategy:
      matrix:
        php_version:
          - 7.4
          - 8.1
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: graycoreio/github-actions-magento2/static-test@main
      with:
        php_version: ${{ matrix.php_version }}
        composer_auth: ${{ secrets.COMPOSER_AUTH }}
```
