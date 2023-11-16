# Magento 2 Coding Standard Action

This Github Action automates the enforcement of Magento Coding Standards. It ensures code consistency and quality by checking code against Magento's specific coding guidelines.

## Inputs

For detailed descriptions of each input, refer to [action.yml](./action.yml).

## Why a Baseline?

Running PHP CodeSniffer (PHPCS) with a baseline is crucial for managing legacy code. It allows you to set a "starting point" for code quality, ignoring existing issues while ensuring no new issues are introduced. This approach is especially useful for large codebases where addressing all existing issues at once is not feasible. The baseline serves as a record of known issues, enabling teams to focus on maintaining and gradually improving code quality in new or modified code.

## Usage Example

The following example demonstrates how to set up the action in your workflow:

Check how this action is used in mage-os [here](https://github.com/mage-os/mageos-magento2/blob/2.4-develop/.github/workflows/coding-standard-baseline.yml).

```yml
name: Coding Standard Baseline

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
    - uses: mage-os/github-actions/coding-standard-baseline@main
      with:
        head_repo: "mage-os/mageos-magento2"
        head_ref: "main"
        php_version: "8.2"
        composer_version: "2"
        version: "*"
        severity: "5"
        warning_severity: "8"
        error_severity: "8"
        baseline_version: "*"
```
