# Setup Install

A GitHub Action that runs `bin/magento setup:install` using the services configuration from the [`supported-version`](../supported-version/README.md) matrix output. Database and service credentials are read directly from the service configuration of `supported-version`, so they stay in sync with the running containers automatically.

## Inputs

| Input        | Required | Default | Description                                                 |
| ------------ | -------- | ------- | ----------------------------------------------------------- |
| `services`   | No       | `null`  | JSON services object from `supported-version` matrix output |
| `path`       | No       | `.`     | Path to the Magento root directory                          |
| `extra_args` | No       | `""`    | Additional arguments to append to `setup:install`           |

## Outputs

| Output    | Description                                               |
| --------- | --------------------------------------------------------- |
| `command` | The full `bin/magento setup:install` command that was run |

## Usage

This action is designed to work with [`supported-version`](../supported-version/README.md) (with `include_services: true`) and [`setup-magento`](../setup-magento/README.md).

```yml
name: Install Test

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
      - uses: graycoreio/github-actions-magento2/supported-version@main
        id: supported-version
        with:
          include_services: "true"

  install:
    needs: compute_matrix
    runs-on: ${{ matrix.os }}
    services: ${{ matrix.services }}
    strategy:
      fail-fast: false
      matrix: ${{ fromJSON(needs.compute_matrix.outputs.matrix) }}
    steps:
      - uses: actions/checkout@v6

      - uses: graycoreio/github-actions-magento2/setup-magento@main
        id: setup-magento
        with:
          php-version: ${{ matrix.php }}
          tools: composer:v${{ matrix.composer }}
        env:
          COMPOSER_AUTH: ${{ secrets.COMPOSER_AUTH }}

      - run: composer install
        working-directory: ${{ steps.setup-magento.outputs.path }}
        env:
          COMPOSER_AUTH: ${{ secrets.COMPOSER_AUTH }}

      - uses: graycoreio/github-actions-magento2/setup-install@main
        with:
          services: ${{ toJSON(matrix.services) }}
          path: ${{ steps.setup-magento.outputs.path }}
```
