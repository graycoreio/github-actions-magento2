# Integration Tests for a Magento Package

A Github Workflow that runs the Integration Tests of a Magento Package

## Inputs

See the [integration.yaml](./integration.yaml)

## Usage

```yml
name: Integration Test

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

jobs:
  integration-workflow:
    uses: graycoreio/github-actions-magento2/.github/workflows/integration.yaml@main
    with:
      package_name: YOUR_PACKAGE_NAME
      source_folder: $GITHUB_WORKSPACE
      test_command: ../../../vendor/bin/phpunit ../../../vendor/YOUR_VENDOR/YOUR_PACKAGE_NAME/Test/Integration
    secrets:
      composer_auth: ${{ secrets.COMPOSER_AUTH }}
```
