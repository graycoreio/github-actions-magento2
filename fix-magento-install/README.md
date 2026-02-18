# Fix Magento

A Github Action that fixes Magento before `composer install`. 

> You probably only need this action if you're working on a Magento extension. However, if you're working on a Magento store and your CI pipeline breaks, this is probably a good first place to look for corrective measures to take.

## Inputs

See the [action.yml](./action.yml)

## Usage

```yml
name: Fix Magento Install

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

jobs:
  fix:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v6
    - uses: graycoreio/github-actions-magento2/fix-magento-install@main
      with:
        magento_directory: path/to/magento
```
