# PHPStan Action

A Github Action that runs [PHPStan](https://phpstan.org/) with the [Magento PHPStan extension](https://github.com/bitExpert/phpstan-magento).

> [!NOTE]
> PHPStan resolves classes through Composer's autoloader. Point `working-directory` at a project where `composer install` has already run, so `Magento\...` references resolve.

## Inputs

See the [action.yml](./action.yml)

## Configuration

If `working-directory` contains a [`phpstan.neon`](https://phpstan.org/config-reference), `phpstan.neon.dist`, or `phpstan.dist.neon`, that file is used as-is and `path`/`level` are ignored. Otherwise a config is generated that includes the Magento extension, analyzes `path` at `level`, and excludes `vendor/`, `generated/`, `var/`, `dev/`, and `setup/` (unless `path` is itself inside `vendor/`). The generated config lives outside the checkout, so your repository is left untouched.

Integration and API tests are excluded when `working-directory` has no `dev/tests/integration/framework` — `Magento\TestFramework` ships inside a Magento install, so analyzing an extension against its own dependencies cannot resolve it. Point `working-directory` at a Magento root and they are analyzed.

## Usage

The caller is responsible for checking out the repository, setting up PHP, and installing dependencies before calling this action.

```yml
name: PHPStan

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

jobs:
  phpstan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v7

    - uses: shivammathur/setup-php@v2
      with:
        php-version: '8.3'
        tools: composer:v2
        coverage: none

    - run: composer install

    - uses: graycoreio/github-actions-magento2/phpstan@v8.9.0 # x-release-please-version
      with:
        path: app/code # Optional, defaults to .
        level: 2 # Optional, defaults to 1.
        error_format: github # Optional, emits workflow annotations instead of a table.
```
