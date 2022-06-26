# Magento 2 Supported Versions

A Github Action that computes the Github Actions Matrix for Magento 2 Versions

All data comes from:

- [v2.3](https://github.com/magento/devdocs/blob/master/src/_data/codebase/v2_3/system-requirements.yml)
- [v2.4](https://github.com/magento/devdocs/blob/master/src/_data/codebase/v2_4/system-requirements.yml)

## Usage

```yml
name: Compute Magento 2 Supported Versions

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

jobs:
  runs-on: ubuntu-latest
  steps:
  - uses: graycoreio/github-actions-magento2/unit-test@main
```
