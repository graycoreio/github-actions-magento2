# Magento 2 Supported Versions

A Github Action that computes the currently supported Github Actions Matrix for Magento 2 Versions

All data comes from:

- [v2.3](https://github.com/magento/devdocs/blob/master/src/_data/codebase/v2_3/system-requirements.yml)
- [v2.4](https://github.com/magento/devdocs/blob/master/src/_data/codebase/v2_4/system-requirements.yml)

## Inputs

See the [action.yml](./action.yml)

| Input           | Description                                                                                                                                                  | Required | Default     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ----------- |
| kind            | The "kind" of support you're targeting for your package. Allowed values are `currently-supported`, `latest` and `custom`                                     | false    | 'currently-supported' |
| custom_versions | The versions you want to support, as a comma-separated string, i.e. 'magento/project-community-edition:2.3.7-p3, magento/project-community-edition:2.4.2-p2' | false    | ''          |

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
      - uses: actions/checkout@v2
      - uses: graycoreio/github-actions-magento2/supported-version@main
        id: supported-version
      - run: echo ${{ steps.supported-version.outputs.matrix }}
```
