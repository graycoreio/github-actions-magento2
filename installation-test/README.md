# Magento 2 Package Installation Test Action

A Github Action that tests the installability of a Magento Package

## Inputs

See the [action.yml](./action.yml)

## Usage

```yml
name: Installation Test

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

jobs:
  compute_matrix:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.supported-version.outputs.matrix }}
    steps:
      - uses: actions/checkout@v2
      - uses: graycoreio/github-actions-magento2/supported-version@main
        id: supported-version
      - run: echo ${{ steps.supported-version.outputs.matrix }}

  install-test:
    needs: compute_matrix
    strategy:
      matrix: ${{ fromJSON(needs.compute_matrix.outputs.matrix) }}
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: graycoreio/github-actions-magento2/installation-test@main
      with:
        composer_version: ${{ matrix.composer }}
        php_version: ${{ matrix.php }}
        magento_version: ${{ matrix.magento }}
        composer_auth: ${{ secrets.COMPOSER_AUTH }}
        package_name: vendor/package
        source_folder: $GITHUB_WORKSPACE
```
