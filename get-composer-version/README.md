# "Get Composer Version" Action

A Github Action that computes an installed Composer version.

## Inputs

See the [action.yml](./action.yml)

## Usage

```yml
name: Get Composer Version

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
    name: A job to compute an installed Composer version.
    steps:
      - uses: actions/checkout@v6
      - uses: graycoreio/github-actions-magento2/get-composer-version@main
        id: get-composer-version
      - run: echo version ${{ steps.get-composer-version.outputs.version }}
        shell: bash
```
