# Magento 2 Supported Versions

A GitHub Action that computes the currently supported GitHub Actions Matrix for Magento 2 Versions

All data comes from:

- [v2.3](https://github.com/magento/devdocs/blob/master/src/_data/codebase/v2_3/system-requirements.yml)
- [v2.4](https://github.com/magento/devdocs/blob/master/src/_data/codebase/v2_4/system-requirements.yml)

## Inputs

See the [action.yml](./action.yml)

| Input           | Description                                                                                                                                                  | Required | Default               |
|-----------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |-----------------------|
| kind            | The "kind" of support you're targeting for your package. Allowed values are `currently-supported`, `latest`, `custom`, `nightly` and `all`                                     | false    | 'currently-supported' |
| project         | The project to return the supported versions for. Allowed values are `mage-os` and `magento-open-source`                                     | false    | 'magento-open-source' |
| custom_versions | The versions you want to support, as a comma-separated string, i.e. 'magento/project-community-edition:2.3.7-p3, magento/project-community-edition:2.4.2-p2' | false    | ''                    |

## Kinds
- `currently-supported` - The currently supported Magento Open Source versions by Adobe.
- `latest` - The latest version of Magento only.
- `custom` - A custom subset of the versions, as specified by you. Requires `custom_versions` sibling key.
- `nightly` - The nightly version of Magento (only available via `https://upstream-nightly.mage-os.org`)
- `all` - All versions of Magento (including patched/unpatched versions).

## Projects
- `mage-os`
- `magento-open-source` (default)

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
