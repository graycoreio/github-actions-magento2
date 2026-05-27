# Setup DI Compile

A GitHub Action that enables all Magento modules and runs `bin/magento setup:di:compile`.

The caller is responsible for checkout, PHP/composer setup, and `composer install`. This action only performs the compilation step.

## Inputs

| Input  | Required | Default | Description                                                        |
| ------ | -------- | ------- | ------------------------------------------------------------------ |
| `path` | No       | `.`     | Path to the Magento root directory. |

## Usage

```yml
name: DI Compile

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  compute_matrix:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.supported-version.outputs.matrix }}
    steps:
      - uses: actions/checkout@v6
      - uses: graycoreio/github-actions-magento2/supported-version@v8.5.0 # x-release-please-version
        id: supported-version

  compile:
    needs: compute_matrix
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix: ${{ fromJSON(needs.compute_matrix.outputs.matrix) }}
    steps:
      - uses: actions/checkout@v6

      - uses: graycoreio/github-actions-magento2/setup-magento@v8.5.0 # x-release-please-version
        id: setup-magento
        with:
          php-version: ${{ matrix.php }}
          tools: composer:v${{ matrix.composer }}

      - uses: graycoreio/github-actions-magento2/cache-magento@v8.5.0 # x-release-please-version

      - run: composer install
        env:
          COMPOSER_AUTH: ${{ secrets.COMPOSER_AUTH }}

      - uses: graycoreio/github-actions-magento2/setup-di-compile@v8.5.0 # x-release-please-version
        with:
          path: ${{ steps.setup-magento.outputs.path }}
```
