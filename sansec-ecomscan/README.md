# Sansec eComscan Security Scan Action

A Github Action that runs the [Sansec eComscan](https://sansec.io/ecomscan) security scanner.

## Inputs

See the [action.yml](./action.yml)

## Usage

The caller is responsible for checking out the repository before calling this action. A valid Sansec license key must be passed via the `ecomscan_key` input.

The `path` input should point to the root of the Magento installation — the directory that contains `app/`, `vendor/`, etc. It defaults to `.` (the current working directory).

```yml
name: Sansec eComscan Security Scan

on:
  push:
  pull_request_target:
  workflow_dispatch:

jobs:
  run-ecomscan:
    # Skip if it's a push event on a PR (it can't access secrets)
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v6

      - uses: graycoreio/github-actions-magento2/sansec-ecomscan@v8.9.0 # x-release-please-version
        with:
          license: ${{ secrets.SANSEC_LICENSE_KEY }}
```
