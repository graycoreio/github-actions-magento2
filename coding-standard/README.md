# Magento 2 Coding Standard Action

A Github Action that runs the Magento Coding Standard.

> [!WARNING]
> This action is only compatible with Magento v2.4.4+.

## Inputs

See the [action.yml](./action.yml)

## Usage

The caller is responsible for checking out the repository and setting up PHP before calling this action.

```yml
name: Coding Standard

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
    - uses: actions/checkout@v6

    - uses: shivammathur/setup-php@v2
      with:
        php-version: '8.3'
        tools: composer:v2
        coverage: none

    - uses: graycoreio/github-actions-magento2/coding-standard@main
      with:
        path: app/code # Optional, defaults to .
        version: 25 # Optional, will use the latest if omitted.
        severity: 8 # Optional, will use phpcs default of 5 if not specified.
        warning_severity: 4 # Optional, will use severity value if not specified.
        error_severity: 7 # Optional, will use severity value if not specified.
```