# Magento 2 Supported Versions


## Inputs

See the [action.yml](./action.yml)

## Usage

```yml
name: Use Supported Versions

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

jobs:
  compute_matrix:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.supported-version.outputs.matrix }}
    steps:
      - uses: graycoreio/github-actions-magento2/supported-version@main
        id: supported-version
      - run: echo ${{ steps.supported-version.outputs.matrix }}
```
