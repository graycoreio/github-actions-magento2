# Magento 2 setup:di:compile action
A Github Action that runs `php bin/magento setup:di:compile` and checks for compilation errors.

## Inputs

See the [action.yml](./action.yml)

## Usage

```yml
name: Magento setup:di:compile check

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

jobs:
  setup-di-compile:
    runs-on: ubuntu-latest
    steps:
    - uses: mage-os/github-actions/setup-di-compile@main
      with:
        php_version: "8.3"
        composer_version: "2"
```
