# Magento 2 Package Installation Test Action

A Github Action that sets Magento up to the point of composer install.

## Inputs

See the [action.yml](./action.yml)

## Usage

### Stores

```yml
name: Setup Magento Store

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  setup-magento-store:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: ./setup-magento
        with:
          php-version: 8.1
          tools: composer:v2
          mode: store
          working-directory: $GITHUB_WORKSPACE

      - run: composer install
        name: Composer install
        shell: bash
        working-directory: ${{ steps.setup-magento.outputs.path }}
```

### Extensions

```yml
name: Setup Magento Store

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

jobs:
    setup-magento-extension:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v3

        - uses: ./setup-magento
          with:
            php-version: 8.1
            tools: composer:v2
            mode: extension
            magento_version: 2.4.5-p1

        - run: composer config repositories.local path $GITHUB_WORKSPACE
          name: Add Github Repo for Testing
          working-directory: ${{ steps.setup-magento.outputs.path }}
          shell: bash

        - run: composer require my/package "@dev"
          name: Attempt install
          working-directory: ${{ steps.setup-magento.outputs.path }}
          shell: bash
          env:
            COMPOSER_AUTH: ${{ secrets.composer_auth }}
```
