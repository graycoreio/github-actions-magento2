# "Get Magento Version" Action

A Github Action that computes an installed Magento version.

## Inputs

See the [action.yml](./action.yml)

## Usage

```yml
name: Get Magento Version

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

jobs:
  version:
    runs-on: ubuntu-latest
    name: A job to compute an installed Magento version.
    steps:
      - uses: actions/checkout@v6
      - uses: graycoreio/github-actions-magento2/get-magento-version@v8.5.0 # x-release-please-version
        id: get-magento-version
      - run: echo version ${{ steps.get-magento-version.outputs.version }}
        shell: bash
```
